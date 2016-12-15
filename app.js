'use strict'
const http = require('http')
const express = require('express')
const Datastore = require('@google-cloud/datastore')

const app = express()
const datastore = Datastore()


/*
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
*/

function saveEntity(key, data) {
  const taskKey = datastore.key(key)

  var taskData = [
    {
      "name": "created",
      "value": new Date().toJSON()
    }
  ]
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      taskData.push({ "name": key, "value": data[key] })
    }
  }


  const entity = {
    "key": taskKey,
    "data": taskData
  }

  return datastore.save(entity)
    .then(() => {
      console.log(`Entity ${taskKey.id} created successfully.`)
      return taskKey
    })
}




http.createServer(function (request, response) {
  // Send the HTTP header
  // HTTP Status: 200 : OK
  // Content Type: text/plain
  response.writeHead(200, { 'Content-Type': 'text/plain' })

  saveEntity('yo', {
    bjornen: "sover",
    lune: "hi"
  })

  // Send the response body as "Hello World"
  response.end('Hello Martian\n')
}).listen(8080)

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/')
