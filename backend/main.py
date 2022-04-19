from cgi import test
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import logging

from PIL import Image
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.models import *
from tensorflow.keras import preprocessing
from keras.preprocessing.image import load_img, img_to_array

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './uploaded_images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
CLASSIFIER_MODEL = "./model/model92.h5"

app = Flask(__name__)
cors = CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


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

    return response

def predict(destination):

    print("INPUT",model.inputs)
    print("OUTPUT",model.outputs)

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

    return result


if __name__ == "__main__":
    # Loading the model:
    model = load_model(CLASSIFIER_MODEL, compile=True)

    # Start the app:
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0")
