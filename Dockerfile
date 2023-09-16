FROM node:18-alpine

WORKDIR /assisto-task
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start