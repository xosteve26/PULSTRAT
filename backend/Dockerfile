FROM python:3.9
# RUN apk add update -y
# RUN ap-get install -y python-pip python-dev

RUN mkdir /app
WORKDIR /app
ADD requirements.txt /app
ADD . /app
RUN apt-get update -y
RUN apt-get install -y g++
# RUN apk add g++
# RUN apk update && \
#     apk add -y install sudo
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]