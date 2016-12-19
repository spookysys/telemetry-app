var fs = require('fs');
var ndarray = require("ndarray")
var savePixels = require("save-pixels")
var Lib3ds = require('./lib3ds/lib3ds')


function savePng(gl, width, height, filename) {
	var file = fs.createWriteStream(filename)
	var pixels = new Uint8Array(width * height * 4)
	gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
	var x = ndarray(pixels, [width, height, 4])
	savePixels(x, "png").pipe(file)
}


function loadFile(filename, cb) {
	fs.readFile(filename, function (err, data) {
		if (err) {
			cb(err)
			return
		}
		var obj = new Lib3ds(null, true)
		obj.readFile(data)
		cb(false, obj)
	});
}

module.exports.loadFile = loadFile
module.exports.savePng = savePng

/*
// loop over the parsed meshes
var i, j;
for (i = 0; i < lib3ds.meshes.length; i++) {

	var mesh = lib3ds.meshes[i]; // a mesh is of type Lib3dsMesh

	// vertices
	for (j = 0; j < mesh.points; j++) {
		var vert = mesh.pointL[j]; // a vert is an Array(3)
	}

	// faces
	for (j = 0; j < mesh.faces; j++) {
		var face = mesh.faceL[j] // a face is of type Lib3dsFace

		// indices into the vert array above
		var idx0 = face.points[0];
		var idx1 = face.points[1];
		var idx2 = face.points[2];

		// so the face vertices are:
		var v0 = mesh.pointL[ idx0 ];
		var v1 = mesh.pointL[ idx1 ];
		var v2 = mesh.pointL[ idx2 ];

		// and the material for the face is:
		var materialName = face.material;
		var material = lib3ds.materials[materialName];
		var ambientColor = material.ambientColor;
		// etc....
	}

	// texels / uv: guess you can use the face indices above
	for (j = 0; j < mesh.texels; j++) {
		var uv = mesh.texelL[j];

		var u = uv[0];
		var v = uv[1];
	}
}

*/