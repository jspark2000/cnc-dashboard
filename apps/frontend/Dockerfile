FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY apps/frontend apps/frontend

RUN rm -rf node_modules

RUN rm -rf apps/frontend/node_modules

RUN npm install

WORKDIR /app/apps/frontend

RUN ls -al

EXPOSE 5173

CMD [ "npm", "run", "start" ]
