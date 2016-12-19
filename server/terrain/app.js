'use strict';


// web libs
const express = require('express')
const app = express()

// geometry
const geolib = require('./geolib')


// image libs
var createContext = require('gl')


// render target size
var terrainTileSize = 256


// Load model
geolib.loadFile(__dirname + '/testdata/MIG-21.3ds', function (err, data) {
  if (err) throw err

  // init rendering surface
  var gl = createContext(terrainTileSize, terrainTileSize, {
    preserveDrawingBuffer: true
  })
  gl.clearColor(1, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // draw object
  {

  }

  // save image
  geolib.savePng(gl, terrainTileSize, terrainTileSize, "preview.png")
})