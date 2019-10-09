const searchStackoverflow  = (message) => encodeURI("https://stackoverflow.com/search?q="+message);

console.log(searchStackoverflow("[JS]" + 'test'));

var map = L.map('map').setView([-20.295813, 57.51352910000001], 10);


// layer switcher
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
var baseMaps = {
    "OpenStreetMap": osm,
    "Esri World Imagery": esri
};
var overlays =  {//add any overlays here

};
L.control.layers(baseMaps,overlays, {position: 'topright'}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// }).addTo(map);

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

// Fit image in boundary
var imageBoundaries =  {
  ferneyOpenTrack: {
    top: [-20.329695, 57.695883],
    bottom: [-20.364450, 57.722130]
  }
};
// L.marker(imageBoundaries.ferneyOpenTrack.top).addTo(map);
// L.marker(imageBoundaries.ferneyOpenTrack.bottom).addTo(map);
var imageUrl = 'images/trails/ferney.jpg',
  imageBounds = [imageBoundaries.ferneyOpenTrack.top, imageBoundaries.ferneyOpenTrack.bottom];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
L.imageOverlay(imageUrl, imageBounds).bringToFront();

// //initialize locate plugin
var lc = L.control.locate().addTo(map);
//lc.start();