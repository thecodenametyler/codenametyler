const searchStackoverflow  = (message) => encodeURI("https://stackoverflow.com/search?q="+message);

console.log(searchStackoverflow("[JS]" + 'test'));

var map = L.map('map').fitWorld();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiY29kZW5hbWV0eWxlciIsImEiOiJjanYzaHYzeDUwajZiNDNvN29xczgxcWszIn0._VYJusU6Xudl9u_HMAnNDg'
}).addTo(map);

map.locate({setView: true, watch: true, maxZoom: 16});

function onLocationFound(e) {
	var radius = e.accuracy;

	L.marker(e.latlng).addTo(map)
		//.bindPopup("You are within " + radius + " meters from this point").openPopup();

	//L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
	alert(e.message);
}

map.on('locationerror', onLocationError);