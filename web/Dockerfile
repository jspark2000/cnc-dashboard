FROM node:20

WORKDIR /app

COPY package*.json .

COPY --chown=node:node . .

RUN rm -rf node_modules

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]