FROM node
# LABEL Name=telemetry-app
VOLUME /usr/src/app
WORKDIR /tmp
COPY package.json /tmp/package.json
RUN cd /tmp \
 && npm install \
 && mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
EXPOSE 5858
EXPOSE 8080
# CMD npm start



# npm install --production