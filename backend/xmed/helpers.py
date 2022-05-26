from fileinput import filename
from flask import session, jsonify
import matplotlib.pyplot as plt
from tensorflow import keras
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
from bson import json_util
import json
from bson import ObjectId
from . import prediction_collection
from . import model

import math
import tensorflow as tf

# Display
from IPython.display import Image, display
import matplotlib.pyplot as plt
import matplotlib.cm as cm


def localized_heatmap_generator(img_path,img_size,filename):
    model.layers[-1].activation = None
    preprocess_input = keras.applications.densenet.preprocess_input
    # decode_predictions = keras.applications.densenet.decode_predictions
    last_conv_layer_name = "conv5_block16_concat"
    initial_conv_layer_name = "conv3_block1_concat"
    img_array = preprocess_input(get_img_array(img_path, size=img_size))
    heatmap = make_gradcam_heatmap(img_array, model, initial_conv_layer_name)
    heatmap_unsaved = make_gradcam_heatmap(img_array, model, last_conv_layer_name)
    plt.matshow(heatmap)
    plt.savefig('./uploaded_images/heatmaps/'+filename)
    localized_image=save_and_display_gradcam(img_path, heatmap_unsaved, filename)
    print(model.summary())
    
    
    
def predict(destination, filename):

    test_image = load_img(
        destination, target_size=(180, 180))
    test_image=img_to_array(test_image)



    test_image = test_image - test_image.mean()
    test_image = test_image / (test_image.std() + keras.backend.epsilon())

 

    test_image = np.expand_dims(test_image, axis=0)
    print("shape: ", test_image.shape)
    class_names = {0: 'PNEUMONIA', 1: 'NORMAL'}

    predictions = model.predict(test_image)
    print("Prediction", predictions)

    print("PNEUMONIA result is:", predictions[0][0]>0.5)
    result = predictions[0][0]>0.5
    print(result)
    localized_heatmap_generator(destination,(180,180),filename)

    return result

def parse_json(data):
    return json.loads(json_util.dumps(data))


def get_img_array(img_path, size):
    # `img` is a PIL image of size 299x299
    img = keras.preprocessing.image.load_img(img_path, target_size=size)
    # `array` is a float32 Numpy array of shape (299, 299, 3)
    array = keras.preprocessing.image.img_to_array(img)
    # We add a dimension to transform our array into a "batch"
    # of size (1, 299, 299, 3)
    array = np.expand_dims(array, axis=0)
    return array


def make_gradcam_heatmap(img_array, model, last_conv_layer_name, pred_index=None):
    # First, we create a model that maps the input image to the activations
    # of the last conv layer as well as the output predictions
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(
            last_conv_layer_name).output, model.output]
    )

    # Then, we compute the gradient of the top predicted class for our input image
    # with respect to the activations of the last conv layer
    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(preds[0])
        class_channel = preds[:, pred_index]

    # This is the gradient of the output neuron (top predicted or chosen)
    # with regard to the output feature map of the last conv layer
    grads = tape.gradient(class_channel, last_conv_layer_output)

    # This is a vector where each entry is the mean intensity of the gradient
    # over a specific feature map channel
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # We multiply each channel in the feature map array
    # by "how important this channel is" with regard to the top predicted class
    # then sum all the channels to obtain the heatmap class activation
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    # For visualization purpose, we will also normalize the heatmap between 0 & 1
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()




def MongoFetch(pageSize,pageNumber, message):
    print(message)
    scans = []
    totalDocuments = prediction_collection.count_documents(
        {"userId": ObjectId(session["id"]["$oid"])})
    scansObj = prediction_collection.find(
        {"userId": ObjectId(session["id"]["$oid"])},{"heatmapImage":0}).sort("timestamps", -1).limit(pageSize).skip(pageSize*(pageNumber-1))
    # print(scansObj)
    for scan in scansObj:
        scans.append(parse_json(scan))
    session['scans'+str(pageNumber)] = [scans, totalDocuments]
    print(len(scans))


    return scans,totalDocuments


def save_and_display_gradcam(img_path, heatmap, filename, alpha=0.4):
    cam_path = "./uploaded_images/localized/"+filename
    # Load the original image
    img = keras.preprocessing.image.load_img(img_path)
    img = keras.preprocessing.image.img_to_array(img)

    # Rescale heatmap to a range 0-255
    heatmap = np.uint8(255 * heatmap)

    # Use jet colormap to colorize heatmap
    jet = cm.get_cmap("jet")

    # Use RGB values of the colormap
    jet_colors = jet(np.arange(256))[:, :3]
    jet_heatmap = jet_colors[heatmap]

    # Create an image with RGB colorized heatmap
    jet_heatmap = keras.preprocessing.image.array_to_img(jet_heatmap)
    jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
    jet_heatmap = keras.preprocessing.image.img_to_array(jet_heatmap)

    # Superimpose the heatmap on original image
    superimposed_img = jet_heatmap * alpha + img
    superimposed_img = keras.preprocessing.image.array_to_img(superimposed_img)

    # Save the superimposed image
    superimposed_img.save(cam_path)

    # Display Grad CAM
    display(Image(cam_path))


# save_and_display_gradcam(img_path2, heatmap2)
