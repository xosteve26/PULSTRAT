import matplotlib.pyplot as plt
from tensorflow import keras
from keras import preprocessing
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
from bson import json_util
import json

from . import model

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
