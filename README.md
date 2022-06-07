# Pulstrat - A Pneumonia Detecting Platform

> A Pneumonia Detecting Web Application Built Using Python Flask(Backend server), React Js(Frontend UI), Tailwind CSS, Mongo DB(Database) & SendGrid

## Features

 - Upload service for x-ray images
 - Instant delivery of results
 - User Authentication 
 - Dashboard to display user's history of scans
 - Send reports to registered email
 - Caching system logic embedded to obtain history of scans quickly
 - Downloadable reports in pdf format

## System Architecture
![architecture diagram](https://res.cloudinary.com/xzen/image/upload/v1654267176/Production_Architecture_1_m0uhxs.png)

## Replication & Usage
### Clone the repository

```git clone https://github.com/xosteve26/PULSTRAT.git ```

### Creating Environmental Variables

Create a .env file in then frontend & backend folder and add the following
##### Backend
```
MONGO_URI = Your Mongo DB ATLAS URI [ Mongo DB connection string ]
SECRET_KEY = Your Flask Secret Key
SENDGRID_API_KEY = Your SendGrid API key [ For email functionality ] [Optional]
```

##### Frontend
**Frontend env consists of the base url, which is the endpoint of the flask server**
#For local environment
```
REACT_APP_BASE_URL=http://localhost:5000 
````


### Install Dependencies (Frontend)

```
cd frontend
npm install 
```

### Install Dependencies (Backend)

```
cd backend
pip install -r requirements.txt
```


## Run

```
# Run frontend (:3000) 
cd frontend
npm run start

# Run backend (:5000)
cd backend
python app.py
```

## Test Dataset
This  test dataset consists of a total of 624 images, out of which 234 images belong to the NORMAL class and the remaining 390 belong to the PNEUMONIA class. Kindly download the dataset through this [link](https://nesrt.herokuapp.com/sCaD4X00P) and feel free to test it out.



## Build & Deploy

```
# Create frontend production build [serve static build]
cd frontend
npm run build
serve -s build
```








