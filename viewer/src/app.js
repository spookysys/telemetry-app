window.CESIUM_BASE_URL = './';

require('../node_modules/cesium/Build/CesiumUnminified/Cesium.js');
require('../node_modules/cesium/Build/CesiumUnminified/Widgets/widgets.css');

var Cesium = window.Cesium;

var viewer = new Cesium.Viewer('cesiumContainer');