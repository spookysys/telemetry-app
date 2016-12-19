var express = require('express');
var io = require('socket.io');

var app = express();

var server = http.createServer(app).listen(SERVER_PORT, function () {
  console.log('Express server listening on port ' + SERVER_PORT);
});

// let socket.IO listen on the server
io = io.listen(server);

io.on('connection', function (socket) { /* handle connection */ });