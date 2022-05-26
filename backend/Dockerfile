FROM python:3.9

# set working direction
RUN mkdir /app
WORKDIR /app
ADD requirements.txt /app
ADD . /app
RUN apt-get update -y
RUN apt-get install -y g++

RUN pip install -r requirements.txt
ARG URI
ARG SECRET
ARG SENDGRID
ENV MONGO_URI=$URI
ENV SECRET_KEY=$SECRET
ENV SENDGRID_API_KEY=$SENDGRID
EXPOSE 5000
CMD ["python", "app.py"]