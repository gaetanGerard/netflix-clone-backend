FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "rebuild", "bcrypt --build-from-source"]

CMD ["node", "server.js"]