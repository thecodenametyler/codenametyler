const searchStackoverflow  = (message) => encodeURI("https://stackoverflow.com/search?q="+message);

console.log(searchStackoverflow("[JS]" + 'test'));


// var mymap = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.outdoors.v11',//satellite, mapbox-terrain-v2, terrain-rgb, mapbox-streets-v8, outdoors
//     accessToken: 'pk.eyJ1IjoiY29kZW5hbWV0eWxlciIsImEiOiJjanYzaHYzeDUwajZiNDNvN29xczgxcWszIn0._VYJusU6Xudl9u_HMAnNDg'
// }).addTo(mymap);

mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZW5hbWV0eWxlciIsImEiOiJjanYzaHYzeDUwajZiNDNvN29xczgxcWszIn0._VYJusU6Xudl9u_HMAnNDg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    zoom: 9.75,
    center: [57.568095, -20.273942]
});

map.addControl(new mapboxgl.NavigationControl());
 
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}