FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "dist/server.js"]
