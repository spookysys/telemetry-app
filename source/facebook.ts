import https = require('https');

export function get(accessToken, apiPath, callback, options = { 'parseJson': true }) {
	// creating options object for the https request
	var getOptions = {
		// the facebook open graph domain
		host: 'graph.facebook.com',

		// secured port, for https
		port: 443,

		// apiPath is the open graph api path
		path: apiPath + '?access_token=' + accessToken,

		// well.. you know...
		method: 'GET'
	};

	// create a buffer to hold the data received
	// from facebook
	var buffer = '';

	// initialize the get request
	var request = https.get(getOptions, function (result) {
		result.setEncoding('utf8');

		// each data event of the request receiving
		// chunk, this is where i`m collecting the chunks
		// and put them together into one buffer...
		result.on('data', function (chunk) {
			buffer += chunk;
		});

		// all the data received, calling the callback
		// function with the data as a parameter
		result.on('end', function () {
			if (options['parseJson'])
				callback(false, JSON.parse(buffer));
			else
				callback(false, buffer);
		});
	});

	// just in case of an error, prompting a message
	request.on('error', function (e) {
		console.log(new Error('error from facebook.get(): ' + e.message), null);
	});

	request.end();
}


