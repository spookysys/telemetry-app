'use strict';


// web libs
const express = require('express')
const app = express()

// geometry
const geolib = require('./geolib')



// render target size
var terrainTileSize = 256


var gl = geolib.createContext(terrainTileSize, terrainTileSize)
geolib.drawExample(gl);
geolib.saveContextPng(gl, "preview.png")

/*
// main stuff
geolib.load3ds(__dirname + '/testdata/MIG-21.3ds', function (err, data) {
  if (err) throw err

  geolib.draw3ds(gl, data)

  // save image
  geolib.saveContextPng(gl, "preview.png")
})

*/