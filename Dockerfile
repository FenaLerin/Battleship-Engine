FROM node:17.4.0

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "node", "index.js" ]