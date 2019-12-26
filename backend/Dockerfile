FROM node:10

WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm install
COPY . .
expose 3000
CMD [ "node", "app.js" ] 
