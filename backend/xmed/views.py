import os, json, bcrypt
import datetime

from bson import ObjectId
from flask import request, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import base64

from . import app,UPLOAD_FOLDER, user_collection, prediction_collection
from . import helpers

#SendGrid 
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *
message = Mail()

# r = redis.Redis(host='localhost', port=6379, db=0)
# r.set('foo','bar')
# print(r.get('foo'))


@app.route('/', methods=["GET", "POST"])
def initial():
    data=json.loads(request.data)
    id=data['id']
    print("data",data['id'])
    numberOfScans = prediction_collection.count_documents(
        {"userId": ObjectId(id)})

    return jsonify(nScan=numberOfScans)

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    print("Requested files", request.files)
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
    

    print(destination)
    file.save(destination)

    response = {'filePath': destination}

    img = Image.open(file)
    with open(destination, "rb") as img_file:
        encoded_image = base64.b64encode(img_file.read())
   
    result = helpers.predict(destination, filename)
    print("RES =", result)
    
    CDN_URL= helpers.cdn_upload(destination,(180,180), filename)
    heatmap_dest = "./uploaded_images/heatmaps/"+filename
    with open(heatmap_dest, "rb") as heatmap_img_file:
        encoded_heatmap_image = base64.b64encode(heatmap_img_file.read())

    localized_dest = "./uploaded_images/localized/"+filename
    with open(localized_dest, "rb") as localized_img_file:
        encoded_localized_image = base64.b64encode(localized_img_file.read())
    
    print("upload", session.get('email'))
    scan_id = prediction_collection.insert_one(
        {"result": bool(result), "userId": ObjectId(session["id"]["$oid"]), "name": session["name"],"fileName":filename, "originalImage": encoded_image.decode("utf-8"), "heatmapImage": encoded_heatmap_image.decode("utf-8"), "localizedImage": encoded_localized_image.decode("utf-8"), "timestamps": datetime.datetime.utcnow()})
    print(session["id"]["$oid"])
    scan_id = helpers.parse_json(scan_id.inserted_id)
    print(scan_id['$oid'])
    print(type(scan_id['$oid']))
    return jsonify(id=scan_id['$oid'])

@app.route('/login', methods=["POST"])
def login():
    print("IN LOGIN")
    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]
    findUser = user_collection.find_one({"email":email})
    if not findUser:
        return {"status":False}
    print("USER", findUser)
    
    hashedPassword = findUser["password"]
    if bcrypt.checkpw(password.encode(), hashedPassword):
        id = findUser["_id"]
        session["email"] = email
        session["name"] = findUser["name"]
        session["id"] = helpers.parse_json(id)

        print("LOGIN SESSION", session)
        print(id)
        print("It Matches!")
        return {"status":True, "userData":json.dumps({"id":helpers.parse_json(id),"name":findUser["name"], "email":findUser["email"]})}
    else:
        print("It Does not Match :(")
        return {"status":False}

    # if(user_collection.find_one({"email" : email})):
    #     return {"status": False, "message": "USER WITH THIS EMAIL EXISTS"}
    # else:
    #     user_collection.insert_one({"email":email,"password":hashedPassword})
    #     return {"status":True}

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

@app.route('/scans', methods=["GET", "POST"])
def get_scans():

    data=json.loads(request.data)
    originalNumberOfScans=data["originalNumberOfScans"]
    currentNumberOfScans=data["currentNumberOfScans"]
    print(originalNumberOfScans,currentNumberOfScans)

    # Cache System Logic
    if (originalNumberOfScans and currentNumberOfScans and originalNumberOfScans == currentNumberOfScans):
        if('scans' in session):
            print("CACHED")
            return jsonify(scans=session['scans'])
        else:
            scans = []
            scansObj = prediction_collection.find(
                {"userId": ObjectId(session["id"]["$oid"])})
            # print(scansObj)
            for scan in scansObj:
                scans.append(helpers.parse_json(scan))
            session['scans']=scans


            # r.set('cache?'+session["id"]["$oid"], dumps(scans))

            return jsonify(scans=scans)
    else:
        scans = []
        scansObj = prediction_collection.find(
            {"userId": ObjectId(session["id"]["$oid"])})
        # print(scansObj)
        for scan in scansObj:
            scans.append(helpers.parse_json(scan))
        session['scans'] = scans

        return jsonify(scans=scans)




@app.route('/report/<string:id>', methods=["GET"])
def report(id):
    reportFile=helpers.parse_json(prediction_collection.find_one({"_id":ObjectId(id)}))
    return jsonify(report=reportFile)


@app.route('/email', methods=["POST"])
def email():
    
    emailData=json.loads(request.data)
    print(emailData)
    print(type(emailData["prediction"]))
    message.to=[
        To(
            email=emailData["userEmail"]
        )
    ]
    message.from_email= From(
        email="noreplyxzen@gmail.com"
    )

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

    sendgrid_client = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))



    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
    return {"status":True}


@app.route('/logout',methods=["GET"])
def logout():
    session.clear()
    return {"status":True}
