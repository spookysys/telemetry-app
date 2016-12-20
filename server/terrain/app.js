'use strict';


// web libs
const express = require('express')
const app = express()

// geometry
const draw = require('./draw')



// render target size
var terrainTileSize = 256

{
  var gl = draw.createContext(terrainTileSize, terrainTileSize)
  draw.drawExample(gl);
  draw.saveContextPng(gl, "nehe.png")
}

// main stuff
draw.load3ds(__dirname + '/testdata/MIG-21.3ds', function (err, data) {
  if (err) throw err

  var gl = draw.createContext(terrainTileSize, terrainTileSize)
  draw.draw3ds(gl, data)
  draw.saveContextPng(gl, "mig.png")
})