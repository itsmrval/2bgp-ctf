FROM node:lts

WORKDIR /usr/src/app

COPY . .
RUN apt update

RUN npm i --loglevel verbose

EXPOSE 3000
CMD ["node", "server.js"]
