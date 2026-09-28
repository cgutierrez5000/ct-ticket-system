FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:server

EXPOSE 3001

CMD ["node", "dist-server/server/index.js"]