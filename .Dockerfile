FROM node:14-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public
RUN npm install 
RUN npm run build

EXPOSE 4000
COPY start.sh ./
RUN chmod +x ./start.sh

CMD node ./src/scripts/init_db.js && ./start.sh