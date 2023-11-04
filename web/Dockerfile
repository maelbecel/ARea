FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY public /app/public
RUN npm run build

EXPOSE 8081
CMD ["npm", "start"]