FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production
ENV DD_ENV production
ENV DD_LOGS_INJECTION true
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/build ./build

EXPOSE 8080
EXPOSE 8126
CMD [ "node", "build/index.js" ]