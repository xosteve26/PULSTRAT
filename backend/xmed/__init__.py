import os
from flask import Flask
from flask_session import Session
from flask_cors import CORS
import logging
import pymongo
import json
# import redis
from tensorflow.keras.models import load_model

from dotenv import load_dotenv
load_dotenv()

from pathlib import Path

mod_path = Path(__file__).parent

UPLOAD_FOLDER =  (mod_path / '../uploaded_images').resolve()
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
CLASSIFIER_MODEL = (mod_path / '../model/model92.h5').resolve()

class ApplicationConfig:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SESSION_TYPE = 'filesystem'
    # SESSION_REDIS = redis.from_url('redis://localhost:6379')
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    UPLOAD_FOLDER = UPLOAD_FOLDER

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
cors = CORS(app ,supports_credentials=True)

server_session=Session(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

# conn_str = os.environ['MONGO_URI']
client = pymongo.MongoClient(
    os.environ.get("MONGO_URI"), serverSelectionTimeoutMS=5000)
try:
    print(client.server_info())
except Exception:
    print("Unable to connect to the server.")

db = client.get_database('xmed')
user_collection = db.users
prediction_collection = db.predictions

#Loading the model:
model = load_model(CLASSIFIER_MODEL, compile=True)

# import all views:
from xmed import views
