FROM node:18-alpine

# ARG로 환경 변수를 받음
ARG COMMUNITY_URL
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DBNAME
ARG DB_HOST
ARG PRODUCT_DB_HOST
ARG DB_PORT
ARG PORT
ARG SESSION_SECRET
ARG IMG_SERVER_URL


# 환경 변수를 설정
ENV COMMUNITY_URL=$COMMUNITY_URL
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_DBNAME=$DB_DBNAME
ENV DB_HOST=$DB_HOST
ENV PRODUCT_DB_HOST=$PRODUCT_DB_HOST
ENV DB_PORT=$DB_PORT
ENV PORT=$PORT
ENV SESSION_SECRET=$SESSION_SECRET
ENV IMG_SERVER_URL=$IMG_SERVER_URL

RUN mkdir /community-server
WORKDIR /community-server

COPY ./package.json ./

RUN yarn install --no-cache

COPY . .


ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn start
