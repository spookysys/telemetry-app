FROM node

VOLUME /usr/src/app
WORKDIR /tmp
COPY package.json /tmp/package.json
RUN cd /tmp \
 && npm install \
 && mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src

COPY 47874b552d55.json /root
ENV GOOGLE_APPLICATION_CREDENTIALS /root/47874b552d55.json

EXPOSE 5858
EXPOSE 8080

WORKDIR /usr/src/app
