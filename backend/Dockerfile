FROM python:3.9
# RUN apk add update -y
# RUN ap-get install -y python-pip python-dev

RUN mkdir /app
WORKDIR /app
#Inser Your MONGO URI & SECRET KEY In The Following ENV'S
ENV MONGO_URI=${MONGO_URI} 
ENV SECRET_KEY=${SECRET_KEY}
ADD requirements.txt /app
ADD . /app
RUN apt-get update -y
RUN apt-get install -y g++

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "app.py"]

