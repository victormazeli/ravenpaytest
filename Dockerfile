FROM node:16
LABEL MAINTAINER Mazeli victor <victor.vic.mazeli@gmail.com>

WORKDIR /usr/src/app
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm ci --only=production

EXPOSE 8080

CMD ["npm", "run", "start"]