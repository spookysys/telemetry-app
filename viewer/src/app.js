window.CESIUM_BASE_URL = './';

require('../node_modules/cesium/Build/CesiumUnminified/Cesium.js');
require('../node_modules/cesium/Build/CesiumUnminified/Widgets/widgets.css');


var Cesium = window.Cesium;

var viewer = new Cesium.CesiumWidget('cesiumContainer');

// Works:
var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: 'https://assets.agi.com/stk-terrain/world',
  requestVertexNormals: true
});



//var terrainProvider = new Cesium.CesiumTerrainProvider({
//  url: 'https://assets.agi.com/stk-terrain/world'
//    //, requestVertexNormals: true
//});

viewer.terrainProvider = terrainProvider;