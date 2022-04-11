from cgi import test
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import logging

from PIL import Image
import matplotlib.pyplot as plt
import tensorflow_hub as hub
import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.models import *
from tensorflow.keras import preprocessing
from keras.preprocessing.image import ImageDataGenerator
import time
from keras.preprocessing.image import load_img

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './uploaded_images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
cors=CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
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
    predict(destination)

    return response

def predict(destination):
    
    classifier_model="./model/model92.h5"
    model = load_model(classifier_model, compile=True)
    print("INPUT",model.inputs)
    print("OUTPUT",model.outputs)

    # test_image = image.resize((180, 180))
    test_image = load_img(
        destination, target_size=(180, 180))
    test_image=np.array(test_image)
    plt.imshow(test_image, cmap='gray')
    plt.show()
    # test_image = preprocessing.image.img_to_array(test_image)
    print(test_image.shape)
 
    test_image = test_image / 255.0
    test_image=test_image.reshape(180,180,3)
    test_image = np.expand_dims(test_image, axis=0)
    print("shape",test_image)
    class_names = {0: 'PNEUMONIA', 1: 'NORMAL'}

    predictions = model.predict(test_image)
    print("PREDICTION", predictions)
    scores = tf.nn.softmax(predictions[0])
    scores = scores.numpy()
    print("scores",scores)

    result = f"{class_names[np.argmax(scores)]} with a { (100 *       np.max(scores)).round(2) } % confidence."
    print("result",result)


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0")

