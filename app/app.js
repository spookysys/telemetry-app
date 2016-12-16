'use strict'
const express = require('express')
const websocket = require('websocket');
const http = require('http')
const dgram = require('dgram');
const datastore = require('@google-cloud/datastore')()

const rocketUdpPort = 1338;
const rocketHtmlPort = 1337;
const dashboardPort = 65080;


// save entity in cloud so we have it
function dsInsert(kind, keyName, data, cb) {
  var taskData = []
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      taskData.push({ "name": key, "value": data[key] })
    }
  }
  const taskKey = datastore.key([
    kind,
    keyName
  ]);
  datastore.save({
    "key": taskKey,
    "data": taskData
  }).then(() => {
    cb(taskKey.name)
  })
}

// all data
var all_data = []



// dashboard http and websocket server
var dashboardHttpServer = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello from dashboardHttpServer\n')
})
dashboardHttpServer.listen(dashboardPort, function () {
  console.log("dashboardHttpServer listening on port " + dashboardPort);
});
var dashboardWsServer = new websocket.server({
  httpServer: dashboardHttpServer
})
dashboardWsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function (message) {
    console.log("dashboardWsServer message")
    if (message.type === 'utf8') {
      // process WebSocket message
    }
  });
  connection.on('close', function (connection) {
    // close dashboard connection
    console.log("dashboardWsServer close")
  });
});
dashboardWsServer.on('connect', function (connection) {
  console.log("dashboardWsServer connect")
})



// rocket udp server
var rocketUdpSocket = dgram.createSocket('udp4');


rocketUdpSocket.on('error', (err) => {
  console.log(`rocketUdpSocket error:\n${err.stack}`);
  rocketUdpSocket.close();
});

rocketUdpSocket.on('message', (msg, rinfo) => {
  console.log(`rocketUdpSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

rocketUdpSocket.bind(rocketUdpPort, () => {
  var address = rocketUdpSocket.address();
  console.log(`rocketUdpSocket listening ${address.address}:${address.port}`);
})



// rocketHtml Server

var rocketHtmlServer = express();

rocketHtmlServer.get('/log', function (req, res) {
  var data = req.query
  const keyName = new Date().toJSON()
  dsInsert("LogEntry", keyName, data, function (id) {
    res.send(`Entity ${id} created successfully.`)
    console.log(`Entity ${id} created successfully.`)
    // generate message for udp thing
    var udpParams = "name=" + keyName
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        udpParams += "&" + key + "=" + data[key]
      }
    }
    rocketUdpSocket.send(udpParams, rocketUdpPort, "127.0.0.1")
  })
});

rocketHtmlServer.listen(rocketHtmlPort, function () {
  console.log('rocketHtmlServer listening on ' + rocketHtmlPort);
})


// DONE!

console.log('Running!');
