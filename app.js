'use strict'
const express = require('express')
const websocket = require('websocket');
const http = require('http')
const datastore = require('@google-cloud/datastore')()

var rocketPort = 1337;
var userPort = 8080;


// save entity in cloud so we have it
function saveDatum(data, cb) {
  var taskData = []
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      taskData.push({ "name": key, "value": data[key] })
    }
  }
  const taskKey = datastore.key("datum")
  datastore.save({
    "key": taskKey,
    "data": taskData
  }).then(() => {
    cb(taskKey.id)
  })
}

// all data
var all_data = []


// rocket Server
var rocketHttpServer = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello Martian\n')
})
rocketHttpServer.listen(rocketPort, function () {
  console.log((new Date()) + " rocket server on port " + rocketPort);
});
var rocketWsServer = new websocket.server({
  httpServer: rocketHttpServer
});
rocketWsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      // process WebSocket message
    }
  });
  connection.on('close', function (connection) {
    // close rocket connection
  });
});



// user Server

var userServer = express();

userServer.get('/log', function (req, res) {
  var data = req.query
  data.created = new Date().toJSON()
  saveDatum(req.query, function (id) {
    res.send(`Entity ${id} created successfully.`)
  })
});

userServer.listen(userPort);


// DONE!

console.log('Running!');
