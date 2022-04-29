from tensorflow.keras.models import load_model
from pathlib import Path
import numpy as np
import tensorflow as tf
from tensorflow import keras

# Display
from IPython.display import Image, display
import matplotlib.pyplot as plt
import matplotlib.cm as cm


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
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
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
  
model_builder = keras.applications.densenet.DenseNet121()
img_size = (180, 180)
preprocess_input = keras.applications.densenet.preprocess_input
decode_predictions = keras.applications.densenet.decode_predictions
  
img_path = keras.utils.get_file("IM-0007-0001.jpeg", "https://tec-image-upload.s3.ap-south-1.amazonaws.com/IM-0007-0001.jpeg")
img_path2 = keras.utils.get_file("p.jpeg", "https://tec-image-upload.s3.ap-south-1.amazonaws.com/p.jpeg")
mod_path = Path(__file__).parent
CLASSIFIER_MODEL = (mod_path / './backend/model/model92.h5').resolve()
last_conv_layer_name = "conv3_block1_concat"

img_array = preprocess_input(get_img_array(img_path, size=img_size))
img_array2 = preprocess_input(get_img_array(img_path2, size=img_size))
model = load_model(CLASSIFIER_MODEL, compile=True)
model.layers[-1].activation = None
# preds = model.predict(img_array)
# print("Predicted:", decode_predictions(preds, top=1)[0])
# Generate class activation heatmap
# print(model.summary())
heatmap = make_gradcam_heatmap(img_array, model, last_conv_layer_name)
heatmap2 = make_gradcam_heatmap(img_array2, model, "conv3_block1_concat")
# Display heatmap
plt.matshow(heatmap)
plt.matshow(heatmap2)
plt.show()