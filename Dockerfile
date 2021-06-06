FROM node:16.3.0-alpine
RUN apk add --no-cache make gcc g++ python3 linux-headers udev
ADD . /app
WORKDIR /app
RUN npm install serialport --build-from-source --save
