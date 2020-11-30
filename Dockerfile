# Base image
FROM node:lts-alpine
# Working directory, duh...
WORKDIR /application
# Add binaries to path
ENV PATH /app/node_modules/.bin:$PATH
# Install Angular CLI
RUN npm install -g @angular/cli
# Copy package.json to container
COPY package.json .
# Install dependencies
RUN npm install --silent
# Copy files to container (ignored files are defined in .dockerignore)
COPY . .
# Build the app
RUN npm run build:ssr
# Serve the app via Node Express and expose it to local environment
CMD npm run serve:ssr --host 0.0.0.0
