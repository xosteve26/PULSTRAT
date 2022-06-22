
import os, json, bcrypt
import shutil
import datetime

from bson import ObjectId
from flask import request, flash, request, session, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import math
from . import app,UPLOAD_FOLDER, user_collection, prediction_collection
from . import helpers
from . import mod_path
from pathlib import Path
#SendGrid 
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *
message = Mail()


@app.route('/', methods=["GET", "POST"])
def initial():
    return ("Pulstrat Backend API")

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    
    original = "uploaded_images/original"
    hm="uploaded_images/heatmaps"
    localized='uploaded_images/localized'
    if not os.path.exists(original):
        os.makedirs(original)
    if not os.path.exists(hm):
        os.makedirs(hm)
    if not os.path.exists(localized):
        os.makedirs(localized)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join(["./uploaded_images/original", filename])
    

    
    file.save(destination)

    response = {'filePath': destination}

    img = Image.open(file)
    with open(destination, "rb") as img_file:
        encoded_image = base64.b64encode(img_file.read())
   
    result = helpers.predict(destination, filename)
    
    heatmap_dest = "./uploaded_images/heatmaps/"+filename
    with open(heatmap_dest, "rb") as heatmap_img_file:
        encoded_heatmap_image = base64.b64encode(heatmap_img_file.read())

    localized_dest = "./uploaded_images/localized/"+filename
    with open(localized_dest, "rb") as localized_img_file:
        encoded_localized_image = base64.b64encode(localized_img_file.read())
    
    
    scan_id = prediction_collection.insert_one(
        {"result": bool(result), "userId": ObjectId(session["id"]["$oid"]), "name": session["name"],"fileName":filename, "originalImage": encoded_image.decode("utf-8"), "heatmapImage": encoded_heatmap_image.decode("utf-8"), "localizedImage": encoded_localized_image.decode("utf-8"), "timestamps": datetime.datetime.utcnow()})
    
    scan_id = helpers.parse_json(scan_id.inserted_id)
 
    return jsonify(id=scan_id['$oid'])

@app.route('/login', methods=["POST"])
def login():
    
    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]
    if not email or not password:
        return {"status": False, "message": "Kindly enter valid values in all fields"}
    findUser = user_collection.find_one({"email":email})
    if not findUser:
        return {"status":False, "message":"No user with this email was found"}
    
    
    hashedPassword = findUser["password"]
    if bcrypt.checkpw(password.encode(), hashedPassword):
        id = findUser["_id"]
        session["email"] = email
        session["name"] = findUser["name"]
        session["id"] = helpers.parse_json(id)

        return {"status":True, "userData":json.dumps({"id":helpers.parse_json(id),"name":findUser["name"], "email":findUser["email"]})}
    else:
        
        return {"status":False, "message":"Incorrect Credentials"}


@app.route('/register', methods=["POST"])
def register():
    data = json.loads(request.data)
    name = data["name"]
    email = data["email"]
    password = data["password"]
    
    if not name or not email or not password:
        return {"status": False, "message": "Enter Valid Values In All Fields"}
    if(user_collection.find_one({"email": email})):
        return {"status": False, "message": "USER WITH THIS EMAIL EXISTS"}
    else:
        hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        user_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashedPassword,
            "timestamps": datetime.datetime.utcnow()
        })
        return {"status": True}

@app.route('/scans/<int:id>', methods=["GET", "POST"])
def get_scans(id):
    pageSize=10
    pageNumber=int(id) if id else 1
    
    data=json.loads(request.data)
    cacheRecords=data["cacheRecords"]
    try:
        currentCountOfDocuments = prediction_collection.count_documents(
            {"userId": ObjectId(session["id"]["$oid"])})
    
    except:
        return jsonify(message="User Not Authenticated"), 401
    
    # Cache System Logic
    if (str(pageNumber) in cacheRecords) and cacheRecords[str(pageNumber)] and 'scans'+str(pageNumber) in session and session['scans'+str(pageNumber)][1] == currentCountOfDocuments:
        
        return jsonify(scans=session['scans'+str(pageNumber)][0], totalPages=int(math.ceil(session['scans'+str(pageNumber)][1]/pageSize)))
    try:
        scans, totalDocuments = helpers.MongoFetch(
            pageSize, pageNumber, message="DATA FETCHED FROM DB")
        return jsonify(scans=scans, totalPages=math.ceil(totalDocuments/pageSize)), 200
    except:
        return jsonify(message="Couldn't fetch data") , 401
    
  



@app.route('/report/<string:id>', methods=["GET"])
def report(id):
    try:
        user_exists=session["id"]["$oid"]
        try:
            reportFile = helpers.parse_json(prediction_collection.find_one({"_id": ObjectId(id), "userId":ObjectId(session["id"]["$oid"])}, {"heatmapImage": 0}))
            if not reportFile:
                return jsonify(message="Cannot Access Requested Report"), 401
            return jsonify(report=reportFile), 200
        except:
            return jsonify(message="Couldn't fetch report, incorrect report ID"), 400
    except:
        return jsonify(message="User Not Authenticated"), 401


@app.route('/email', methods=["POST"])
def email():
    
    emailData=json.loads(request.data)

    message.to=[
        To(
            email=emailData["userEmail"]
        )
    ]
    message.from_email= From(
        email="noreplyxzen@gmail.com"
    )
    try:
        message.subject = Subject("Your Scan Report"+", "+emailData["userName"])
        message.template_id="d-1a3d62ced7a94aeba2ddbee2cac2fc35"
        message.dynamic_template_data={
            "user_name":emailData["userName"],
            "user_email":emailData["userEmail"],
            "scan_id":"#"+emailData["scanId"],
            "prediction":emailData["prediction"],
            "scan_date":emailData["scanTime"],
            "current_date": str(datetime.datetime.utcnow())
        }
    except:
        return jsonify(message="Email Data not found"), 400

 
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        return {"status": True, "message": "Email sent successfully"}, 200
    except Exception as e:
        return {"status":False, "message":"Error sending email"}, 200
    


@app.route('/logout',methods=["GET"])
def logout():
    session.clear()
    original = "../uploaded_images/original"
    hm = "../uploaded_images/heatmaps"
    localized = '../uploaded_images/localized'
    
    if os.path.exists(hm):
        shutil.rmtree((mod_path / '../uploaded_images/heatmaps').resolve())
    if os.path.exists(localized):
        shutil.rmtree((mod_path / '../uploaded_images/localized').resolve())
    if os.path.exists(original):
        shutil.rmtree((mod_path / '../uploaded_images/original').resolve())
    return {"status":True}, 200
