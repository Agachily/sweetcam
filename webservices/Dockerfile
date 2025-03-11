FROM node:18-alpine

WORKDIR /app/webservices

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "index.js"]