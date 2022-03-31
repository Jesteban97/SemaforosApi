FROM node:16.10.0-alpine

COPY . /app
WORKDIR /app

RUN npm install
RUN node ace build --production
RUN cp .env.example build/.env
WORKDIR /app/build
RUN npm ci --production
RUN node ace generate:key

#variables de entorno
ENV NODE_ENV=production
ENV WS_KEY=594hUWREQq2VD6F3uS5PtlFWNSK4UDk0
ENV WS_UID=apisemaforosreportesmed
ENV APP_TITLE="apisemaforosreportesmed"


EXPOSE  3011
CMD ["node", "server.js"]