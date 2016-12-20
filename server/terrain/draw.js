var fs = require('fs');
var ndarray = require("ndarray");
var savePixels = require("save-pixels");
var Lib3ds = require('./lib3ds');
var glCreateContext = require('gl');
var mat4 = require('gl-matrix').mat4



function load3ds(filename, cb) {
	fs.readFile(filename, function (err, data) {
		if (err) {
			cb(err);
			return;
		}
		var obj = new Lib3ds(null, false);
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
					colorVarying = positionAttribute*0.1 + vec3(.5,.5,.5); \
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

	// Shader program
	var shaderProgram = createShaderProgram(gl);
	gl.useProgram(shaderProgram);

	// Projection
	{
		var pMatrix = mat4.create();
		var scale = 2500;
		mat4.ortho(pMatrix, -scale, scale, -scale, scale, 1, 300);
		mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 1, 10000.0);
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	}

	// create vertexpositionbuffer
	var vertexPositionBuffer = gl.createBuffer();

	// loop over the parsed meshes and draw them
	var sceneMax = [-Infinity, -Infinity, -Infinity];
	var sceneMin = [Infinity, Infinity, Infinity];
	for (var i = 0; i < data.meshes.length; i++) {
		var mesh = data.meshes[i]; // a mesh is of type Lib3dsMesh

		// vertices
		var max = [-Infinity, -Infinity, -Infinity];
		var min = [Infinity, Infinity, Infinity];
		for (var j = 0; j < mesh.points; j++) {
			var vert = mesh.pointL[j]; // a vert is an Array(3)
			for (var k = 0; k < 3; k++) {
				min[k] = Math.min(min[k], vert[k]);
				max[k] = Math.max(max[k], vert[k]);
			}
		}
		for (var k = 0; k < 3; k++) {
			sceneMin[k] = Math.min(sceneMin[k], min[k]);
			sceneMax[k] = Math.max(sceneMax[k], max[k]);
		}


		// faces
		var vertices = new Float32Array(mesh.faces * 9);
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

			vertices[j * 9 + 0] = v0[0];
			vertices[j * 9 + 1] = v0[1];
			vertices[j * 9 + 2] = v0[2];
			vertices[j * 9 + 3] = v1[0];
			vertices[j * 9 + 4] = v1[1];
			vertices[j * 9 + 5] = v1[2];
			vertices[j * 9 + 6] = v2[0];
			vertices[j * 9 + 7] = v2[1];
			vertices[j * 9 + 8] = v2[2];

			// and the material for the face is:
			var materialName = face.material;
			var material = data.materials[materialName];
			var ambientColor = material.ambientColor;
			// etc....
		}

		console.log("verts: " + mesh.points);
		console.log("faces: " + mesh.faces);
		console.log("exploded verts: " + vertices.length / 3);
		console.log("min: " + min);
		console.log("max: " + max);
		console.log();
		// Draw
		{
			var mvMatrix = mat4.create();
			mat4.lookAt(mvMatrix, [5000, 3600, -1000], [5000, 3600, 0], [0, 1, 0]);
			gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

			gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
			gl.vertexAttribPointer(shaderProgram.positionAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
		}

		// texels / uv: guess you can use the face indices above
		for (var j = 0; j < mesh.texels; j++) {
			var uv = mesh.texelL[j];

			var u = uv[0];
			var v = uv[1];
		}
	}
	console.log("sceneMin: " + sceneMin);
	console.log("sceneMax: " + sceneMax);

	// delete vertexPositionBuffer
	gl.deleteBuffer(vertexPositionBuffer);
}


module.exports.createContext = createContext
module.exports.saveContextPng = saveContextPng
module.exports.load3ds = load3ds
module.exports.draw3ds = draw3ds
module.exports.drawExample = drawExample