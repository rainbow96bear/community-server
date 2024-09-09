FROM node:18-alpine

RUN mkdir /community-server
WORKDIR /community-server

RUN touch .env

COPY ./package.json ./

RUN yarn install --no-cache

COPY . .


ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn start
