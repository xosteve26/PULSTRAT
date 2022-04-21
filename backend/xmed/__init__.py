import os
from flask import Flask
from flask_cors import CORS
import logging
import pymongo
import json
from tensorflow.keras.models import load_model

from dotenv import load_dotenv
load_dotenv()

from pathlib import Path

mod_path = Path(__file__).parent

UPLOAD_FOLDER =  (mod_path / '../uploaded_images').resolve()
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
CLASSIFIER_MODEL = (mod_path / '../model/model92.h5').resolve()

app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY'] 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

conn_str = os.environ['MONGO_URI']
client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)
try:
    # print(client.server_info())
    pass
except Exception:
    print("Unable to connect to the server.")

db = client.get_database('xmed')
user_collection = db.users
prediction_collection = db.predictions

#Loading the model:
model = load_model(CLASSIFIER_MODEL, compile=True)

# import all views:
from xmed import views
