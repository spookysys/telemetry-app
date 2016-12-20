var fs = require('fs');
var ndarray = require("ndarray");
var savePixels = require("save-pixels");
var Lib3ds = require('./lib3ds/lib3ds');
var glCreateContext = require('gl');
var mat4 = require('gl-matrix').mat4



function load3ds(filename, cb) {
	fs.readFile(filename, function (err, data) {
		if (err) {
			cb(err);
			return;
		}
		var obj = new Lib3ds(null, true);
		obj.readFile(data);
		cb(false, obj);
	});
}


function createContext(width, height) {
	var gl = glCreateContext(width, height, {
		preserveDrawingBuffer: true
	})
	gl.clearColor(1, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, width, height);
	gl.viewportWidth = width;
	gl.viewportHeight = height;
	return gl;
}


function saveContextPng(gl, filename) {
	var file = fs.createWriteStream(filename);
	var pixels = new Uint8Array(gl.viewportWidth * gl.viewportHeight * 4);
	gl.readPixels(0, 0, gl.viewportWidth, gl.viewportHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	var x = ndarray(pixels, [gl.viewportWidth, gl.viewportHeight, 4]);
	savePixels(x, "png").pipe(file);
}



function createShaderProgram(gl) {
	var fShaderCode = " \
			precision mediump float; \
			varying vec3 colorVarying; \
			void main(void) { \
					gl_FragColor = vec4(colorVarying, 1.0); \
			} "

	var vShaderCode = " \
			attribute vec3 positionAttribute; \
			uniform mat4 mvMatrixUniform; \
			uniform mat4 pMatrixUniform; \
			varying vec3 colorVarying; \
			void main(void) { \
					gl_Position = pMatrixUniform * mvMatrixUniform * vec4(positionAttribute, 1.0); \
					colorVarying = positionAttribute + vec3(.5,.5,.5); \
			} "

	var vShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vShader, vShaderCode);
	gl.compileShader(vShader);
	if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(vShader));
		throw Error("Error compiling Vertex shader");
	}

	var fShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fShader, fShaderCode);
	gl.compileShader(fShader);
	if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(fShader));
		throw Error("Error compiling fragment shader");
	}

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vShader);
	gl.attachShader(shaderProgram, fShader);
	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log(gl.getShaderInfoLog(shaderProgram));
		throw Error("Error creating shader program");
	}
	shaderProgram.positionAttribute = gl.getAttribLocation(shaderProgram, "positionAttribute");
	gl.enableVertexAttribArray(shaderProgram.positionAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrixUniform");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "mvMatrixUniform");

	return shaderProgram;
}




function drawExample(gl) {

	// Create triangle vertex buffer
	var triangleVertexPositionBuffer = function () {
		var vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		var vertices = [
			0.0, 1.0, 0.0, -1.0, -1.0, 0.0,
			1.0, -1.0, 0.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = 3;
		return vertexPositionBuffer;
	}();

	// Create square vertex buffer
	var squareVertexPositionBuffer = function () {
		var vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		var vertices = [
			1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
			1.0, -1.0, 0.0, -1.0, -1.0, 0.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = 4;
		return vertexPositionBuffer;
	}();

	// Shader program
	var shaderProgram = createShaderProgram(gl);
	gl.useProgram(shaderProgram);

	// Projection
	{
		var pMatrix = mat4.create();
		mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	}

	// Draw Triangle
	{
		var mvMatrix = mat4.create();
		mat4.fromTranslation(mvMatrix, [-1.5, 0.0, -7.0]);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.positionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
	}

	// Draw Square
	{
		var mvMatrix = mat4.create();
		mat4.fromTranslation(mvMatrix, [1.5, 0.0, -7.0]);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.positionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
	}

}


function draw3ds(gl, data) {


	// loop over the parsed meshes
	for (var i = 0; i < data.meshes.length; i++) {
		var mesh = data.meshes[i]; // a mesh is of type Lib3dsMesh

		// vertices
		for (var j = 0; j < mesh.points; j++) {
			var vert = mesh.pointL[j]; // a vert is an Array(3)
			console.log(vert);
		}

		// faces
		for (var j = 0; j < mesh.faces; j++) {
			var face = mesh.faceL[j] // a face is of type Lib3dsFace

			// indices into the vert array above
			var idx0 = face.points[0];
			var idx1 = face.points[1];
			var idx2 = face.points[2];

			// so the face vertices are:
			var v0 = mesh.pointL[idx0];
			var v1 = mesh.pointL[idx1];
			var v2 = mesh.pointL[idx2];

			// and the material for the face is:
			var materialName = face.material;
			var material = data.materials[materialName];
			var ambientColor = material.ambientColor;
			// etc....
		}

		// texels / uv: guess you can use the face indices above
		for (var j = 0; j < mesh.texels; j++) {
			var uv = mesh.texelL[j];

			var u = uv[0];
			var v = uv[1];
		}
	}
}


module.exports.createContext = createContext
module.exports.saveContextPng = saveContextPng
module.exports.load3ds = load3ds
module.exports.draw3ds = draw3ds
module.exports.drawExample = drawExample