import os, json, bcrypt
import datetime as dt
from bson import ObjectId
from flask import request, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
from . import app, UPLOAD_FOLDER, user_collection
from . import helpers

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    print("Requested files", request.files)
    target = UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([UPLOAD_FOLDER, filename])

    print(destination)
    file.save(destination)

    session['uploadFilePath'] = destination

    img = Image.open(file)
    result = helpers.predict(destination)
    print("RES =", result)

    # prediction_collection.insert_one({"result":result,"userId":ObjectId()})

    return jsonify(prediction=bool(result))

@app.route('/login', methods=["POST"])
def login():
    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]
    findUser = user_collection.find_one({"email":email})
    print("USER", findUser)
    id = findUser["_id"]
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
        user_collection.insert_one({"name":name,"email": email, "password": hashedPassword})
        return {"status": True}
