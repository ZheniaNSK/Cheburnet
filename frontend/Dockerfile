FROM node:22-alpine

WORKDIR /vite

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]