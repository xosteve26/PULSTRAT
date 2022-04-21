import os, json, bcrypt
import datetime
from bson import ObjectId
from flask import request, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
from . import app,UPLOAD_FOLDER, user_collection, prediction_collection
from . import helpers

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    print("Requested files", request.files)
    target = "../uploaded_images"
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join(["../uploaded_images", filename])

    print(destination)
    file.save(destination)

    # session['uploadFilePath'] = destination
    response = {'filePath': destination}

    img = Image.open(file)
    result = helpers.predict(destination)
    print("RES =", result)

    print("upload", session.get('email'))
    scan_id = prediction_collection.insert_one(
        {"result": bool(result), "userId": ObjectId(session["id"]["$oid"]), "name": session["name"], "timestamps": datetime.datetime.utcnow()})
    print(session["id"]["$oid"])
    scan_id = helpers.parse_json(scan_id.inserted_id)
    print(scan_id['$oid'])
    print(type(scan_id['$oid']))
    return jsonify(prediction=bool(result), name=session["name"], timestamps=str(datetime.datetime.utcnow()), userId=str(session["id"]["$oid"]),id=scan_id['$oid'])

@app.route('/login', methods=["POST"])
def login():

    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]
    findUser = user_collection.find_one({"email":email})
    print("USER", findUser)
    id = findUser["_id"]
    session["email"] = email
    session["name"] = findUser["name"]
    session["id"] = helpers.parse_json(id)

    print("LOGIN SESSION", session)
    print(id)
    hashedPassword = findUser["password"]
    if bcrypt.checkpw(password.encode(), hashedPassword):
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

    hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    if(user_collection.find_one({"email": email})):
        return {"status": False, "message": "USER WITH THIS EMAIL EXISTS"}
    else:
        user_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashedPassword,
            "timestamps": datetime.datetime.utcnow()
        })
        return {"status": True}

@app.route('/scans', methods=["GET"])
def get_scans():
    print(session)
    scans = []
    scansObj = prediction_collection.find({"userId": ObjectId(session["id"]["$oid"])})

    for scan in scansObj:
        scans.append(helpers.parse_json(scan))

    return jsonify(scans=scans)

@app.route('/logout',methods=["GET"])
def logout():
    session.pop('email')
    session.pop('id')
    session.pop('name')

    return {"status":True}
