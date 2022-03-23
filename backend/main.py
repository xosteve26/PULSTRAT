import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './uploaded_images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
@cross_origin()
def fileUpload():
    print("Requested files",request.files)
    target = UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    # logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([UPLOAD_FOLDER, filename])
    print(destination)
    file.save(destination)
    session['uploadFilePath'] = destination
    response = {'filePath': destination}

    return response


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0", use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')
