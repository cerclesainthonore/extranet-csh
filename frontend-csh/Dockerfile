FROM node:20-alpine3.16 as builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginxinc/nginx-unprivileged:1.25-alpine

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

USER root

EXPOSE 8080

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

USER $UID
