FROM node:18-alpine

WORKDIR .

COPY package*.json ./

USER root

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "server.js" ]