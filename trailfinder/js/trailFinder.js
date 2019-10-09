const searchStackoverflow  = (message) => encodeURI("https://stackoverflow.com/search?q="+message);

console.log(searchStackoverflow("[JS]" + 'test'));

var map = L.map('map').setView([-20.295813, 57.51352910000001], 10);

var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    mqi = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png", {subdomains: ['otile1','otile2','otile3','otile4']});

var baseMaps = {
    "OpenStreetMap": osm,
    "MapQuestImagery": mqi
};


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// map.locate({setView: true, watch: true, maxZoom: 16});
// function onLocationFound(e) {
// 	var radius = e.accuracy / 4;

// 	L.marker(e.latlng).addTo(map)
// 		.bindPopup("You are within " + radius + " meters from this point").openPopup();

// 	L.circle(e.latlng, radius).addTo(map);
// }
// map.on('locationfound', onLocationFound);

function onLocationError(e) {
	alert(e.message);
}
map.on('locationerror', onLocationError);
/*
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) { // success callback
  var crd = pos.coords;
  var values = [crd.latitude, crd.longitude];
  doSomethingWithCoordinateValues(values);
};
function doSomethingWithCoordinateValues(coords) {
  // do something with 'coords'
  var lat = coords[0];
  var lng = coords[1];
  var zoom = 12;
  // add a marker
  var marker = L.marker([lat, lng],{}).addTo(map);
  map.setView([lat, lng], zoom);
}
function error(err) { // error callback
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
navigator.geolocation.getCurrentPosition(success, error, options);*/

//Fit image in boundary
var imageBoundaries =  {
  img_1: {
    top: [-20.295813, 57.51352910000001],
    bottom: [-22.295813, 60.51352910000001]
  }
};
L.marker(imageBoundaries.img_1.top).addTo(map);
L.marker(imageBoundaries.img_1.bottom).addTo(map);
var imageUrl = 'https://www.preeska.com/assets/img/landing/illu_recycle.svg',
  imageBounds = [imageBoundaries.img_1.top, imageBoundaries.img_1.bottom];

L.imageOverlay(imageUrl, imageBounds).addTo(map);
L.imageOverlay(imageUrl, imageBounds).bringToFront();


var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    mqi = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png", {subdomains: ['otile1','otile2','otile3','otile4']});

var baseMaps = {
    "OpenStreetMap": osm,
    "MapQuestImagery": mqi
};

var overlays =  {//add any overlays here

    };

L.control.layers(baseMaps,overlays, {position: 'topright'}).addTo(map);

// //initialize locate plugin
// L.control.locate().addTo(map);

// create control and add to map
var lc = L.control.locate().addTo(map);
// request location update and set location
//lc.start();