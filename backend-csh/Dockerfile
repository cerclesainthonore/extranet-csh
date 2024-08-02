FROM node:18-alpine

WORKDIR .

COPY package*.json ./

USER root

RUN npm install

COPY --chown=node:node ./server.js .

EXPOSE 8080

CMD [ "node", "app.js" ]