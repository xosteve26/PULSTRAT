from cgi import test
from flask import Flask, session
from flask_sessionstore import Session
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import logging
from flask import json
from flask import jsonify
from PIL import Image
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.models import *
from tensorflow.keras import preprocessing
from keras.preprocessing.image import load_img, img_to_array
import pymongo
from bson import json_util
from bson import ObjectId
import json
from dotenv import load_dotenv
import bcrypt
# from bson.timestamp import Timestamp
import datetime as dt
load_dotenv()

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './uploaded_images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
CLASSIFIER_MODEL = "./model/model92.h5"

app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = '619391a7b458ff9f0d8e7b043b91c17fc803aa9b6e391b60dca9251e08497570'
# app.config['SECRET_TYPE'] = 'filesystem'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# SESSION_TYPE = 'filesystem'
# app.config.from_object(__name__)

# Session(app)



conn_str = os.environ['MONGO_URI']
client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)
try:
    # print(client.server_info())
    pass
except Exception:
    print("Unable to connect to the server.")

db = client.get_database('xmed')
user_collection=db.users
prediction_collection = db.predictions

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    print("Requested files",request.files)
    target = UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([UPLOAD_FOLDER, filename])

    print(destination)
    file.save(destination)

    session['uploadFilePath'] = destination
    response = {'filePath': destination}

    img = Image.open(file)
    result = predict(destination)
    print("RES =",result)
    

    # prediction_collection.insert_one({"result":result,"userId":ObjectId()})

    return jsonify(prediction=bool(result))

def predict(destination):

    test_image = load_img(
        destination, target_size=(180, 180))
    test_image=img_to_array(test_image)

    # plt.imshow(test_image, cmap='gray')
    # plt.show()
    # test_image = preprocessing.image.img_to_array(test_image)
    # print(test_image.shape)
    # print(test_image.mean())
    # print(test_image.std())

    test_image = test_image - test_image.mean()
    test_image = test_image / (test_image.std() + keras.backend.epsilon())

    # print(test_image.shape)
    # print(test_image.mean())
    # print(test_image.std())

    test_image = np.expand_dims(test_image, axis=0)
    print("shape: ", test_image.shape)
    class_names = {0: 'PNEUMONIA', 1: 'NORMAL'}

    predictions = model.predict(test_image)
    print("Prediction", predictions)

    print("PNEUMONIA result is:", predictions[0][0]>0.5)
    result = predictions[0][0]>0.5
    print(result)
    # prediction_collection.insert_one({"result":result})
    return result
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/login', methods=["POST"])
def login():
    data=json.loads(request.data)
    email=data["email"]
    password=data["password"]
    findUser = user_collection.find_one({"email":email})
    print("USER", findUser)
    id = findUser["_id"]
    print(id)
    hashedPassword=findUser["password"]
    if bcrypt.checkpw(password.encode(), hashedPassword):
        print("It Matches!")
        return {"status":True, "userData":json.dumps({"id":parse_json(id),"name":findUser["name"], "email":findUser["email"]})}
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
    name=data["name"]
    email = data["email"]
    password = data["password"]
    

    hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    if(user_collection.find_one({"email": email})):
        return {"status": False, "message": "USER WITH THIS EMAIL EXISTS"}
    else:
        user_collection.insert_one({"name":name,"email": email, "password": hashedPassword})
        return {"status": True}



    


    



if __name__ == "__main__":
    # Loading the model:
    model = load_model(CLASSIFIER_MODEL, compile=True)
    
    # Start the app:
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0")
