# Pulstrat - A Pneumonia Detecting Platform

> A Pneumonia Detecting Web Application Built Using The MERN Stack , Tailwind CSS 

## Features

 - Upload service for x-ray images
 - Instant delivery of results
 - User Authentication 
 - Dashboard to display user's history of scans

## Environmental Variables

Create a .env file in then frontend & backend folder and add the following
##### Backend
```
MONGO_URI = Your Mongo DB ATLAS URI [Mongo DB connection string]
SECRET_KEY = Your Flask Secret Key
```

##### Frontend
**Frontend env consists of the base url endpoint of the flask backend**

```
REACT_APP_BASE_URL=http://localhost:5000 
````

## Install Dependencies (Frontend)

```
cd frontend
npm install 
```

## Install Dependencies (Backend)

```
cd backend
pip install -r requirements.txt
```


### Run

```
# Run frontend (:3000) 
cd frontend
npm run start

# Run backend (:5000)
cd backend
python app.py
```

## Build & Deploy

```
# Create frontend production build [serve static build]
cd frontend
npm run build
```








