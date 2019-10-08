const searchStackoverflow  = (message) => encodeURI("https://stackoverflow.com/search?q="+message);

console.log(searchStackoverflow("[JS]" + 'test'));

var map = L.map('map').fitWorld();

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
  
  navigator.geolocation.getCurrentPosition(success, error, options);