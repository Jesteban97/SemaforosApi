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
ENV WS_KEY=D7qVyDA9xcAF6NkCb7M3N4cmAFooDig70ON9hRBO8DV4l
ENV WS_UID=reportesmed
ENV APP_TITLE="apisemaforosreportesmed"


EXPOSE  3029
CMD ["node", "server.js"]