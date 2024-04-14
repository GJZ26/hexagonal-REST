FROM node:20.11.1-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3030
CMD ["npm", "start"]