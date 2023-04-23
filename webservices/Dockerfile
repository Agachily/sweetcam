FROM node:18

WORKDIR /app/webservices
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3001

CMD ["npm", "start"]