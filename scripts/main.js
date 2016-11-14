/*
requirejs(["helper/util"], function(util) {
		//This function is called when scripts/helper/util.js is loaded.
		//If util.js calls define(), then this function is not fired until
		//util's dependencies have loaded, and the util argument will hold
		//the module value for "helper/util".
});
*/


/*
// onload callback
function drawChart() {

var public_key = 'dZ4EVmE8yGCRGx5XRX1W';

// JSONP request
var jsonData = $.ajax({
		url: 'https://data.sparkfun.com/output/' + public_key + '.json',
		data: {page: 1},
		dataType: 'jsonp',
}).done(function (results) {

		var data = new google.visualization.DataTable();

		data.addColumn('datetime', 'Time');
		data.addColumn('number', 'Temp');
		data.addColumn('number', 'Wind Speed MPH');

		$.each(results, function (i, row) {
		data.addRow([
				(new Date(row.timestamp)),
				parseFloat(row.tempf),
				parseFloat(row.windspeedmph)
		]);
		});

		var chart = new
google.visualization.LineChart($('#chart').get(0));

		chart.draw(data, {
		title: 'Wimp Weather Station'
		});

});

}

// load chart lib
google.load('visualization', '1', {
		packages: ['corechart']
});

// call drawChart once google charts is loaded
google.setOnLoadCallback(drawChart);
*/



// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['corechart']});

function initMap() {
	// The following path marks a path from Mt. Whitney, the highest point in the
	// continental United States to Badwater, Death Valley, the lowest point.
	var path = [
		{lat: 36.579, lng: -118.292},   // Mt. Whitney
		{lat: 36.606, lng: -118.0638},  // Lone Pine
		{lat: 36.433, lng: -117.951},   // Owens Lake
		{lat: 36.588, lng: -116.943},   // Beatty Junction
		{lat: 36.34, lng: -117.468},    // Panama Mint Springs
		{lat: 36.24, lng: -116.832}
	];  // Badwater, Death Valley

	var map = new google.maps.Map(
			document.getElementById('map'),
			{zoom: 8, center: path[1], mapTypeId: 'terrain'});

	// Create an ElevationService.
	var elevator = new google.maps.ElevationService;

	// Draw the path, using the Visualization API and the Elevation service.
	displayPathElevation(path, elevator, map);
}


function displayPathElevation(path, elevator, map) {
	// Display a polyline of the elevation path.
	new google.maps.Polyline(
			{path: path, strokeColor: '#0000CC', opacity: 0.4, map: map});

	// Create a PathElevationRequest object using this array.
	// Ask for 256 samples along that path.
	// Initiate the path request.
	elevator.getElevationAlongPath({'path': path, 'samples': 256}, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
	var chart = new google.visualization.LineChart($('#chart').get(0));

	// chart.draw(data, {title: 'Wimp Weather Station'});

	// Extract the data from which to populate the chart.
	// Because the samples are equidistant, the 'Sample'
	// column here does double duty as distance along the
	// X axis.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Sample');
	data.addColumn('number', 'Altitude');
	for (var i = 0; i < elevations.length; i++) {
		data.addRow(['', elevations[i].elevation]);
	}

	/*
	var data = new google.visualization.DataTable();
	data.addColumn('datetime', 'Time');
	data.addColumn('number', 'Temp');
	data.addColumn('number', 'Wind Speed MPH');
	$.each(results, function(i, row) {
		data.addRow([
			(new Date(row.timestamp)), parseFloat(row.tempf),
			parseFloat(row.windspeedmph)
		]);
	});
	*/

	// Draw the chart using the data within its DIV.
	chart.draw(data, {/*height: 150, */title:'Yo', legend: 'none', titleY: 'Elevation (m)'});
}

// call drawChart once google charts is loaded
google.setOnLoadCallback(initMap);
