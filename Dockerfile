# Base image
FROM node:14.2.0-alpine3.11
# Working directory, duh...
WORKDIR /app
# Add binaries to path
ENV PATH /app/node_modules/.bin:$PATH
# Copy package.json to container
COPY package.json /app/package.json
# Install Angular CLI
RUN npm install -g @angular/cli
# Copy source to container
COPY . /app
# Build and serve the app via Node Express
CMD npm run build:ssr && npm run serve:ssr --host 0.0.0.0
