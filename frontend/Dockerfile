FROM node:alpine
# set working direction
WORKDIR /app

# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./

RUN npm run build
EXPOSE 3000
# start app
CMD ["npm", "run","start"]