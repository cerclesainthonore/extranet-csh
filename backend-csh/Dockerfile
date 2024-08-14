FROM node:18-alpine

WORKDIR .

COPY package*.json ./

USER root

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js" ]