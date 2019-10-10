var stackoverflow =  {
  /**
   * Search on stackoverflow
   *
   * @param {string} message - the message to be searched
   */
  search: function(message) {
    return encodeURI("https://stackoverflow.com/search?q="+message);
  }
};

var OSM = {
  el: {
    center: [-20.295813, 57.51352910000001],
    imageBoundaries: {
      ferneyOpenTrack: {
        top: [-20.329695, 57.695883],
        bottom: [-20.364450, 57.722130],
        img: 'images/trails/ferney-cutout-min.png'
      }
    }
  },
  init: function() {
    /**
     * launch the map creation
     */
    OSM.map('osm-map');
  },
  map: function(mapId) {
    /**
     * Initialize map
     *
     * @param {string} mapId - div id
     */
    var map = L.map(mapId).setView(OSM.el.center, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // DEBUG SATELITE MODE
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    // }).addTo(map);

    /**
     * Display error message if theres any in console + make stackoverflow link
     * @param {object} e - event handler
     */
    function onLocationError(e) {
      console.log(stackoverflow.search("[JS] " + e.message));
    }
    map.on('locationerror', onLocationError);

    /**
     * Add ability to switch view from :
     * OSM / Esri
     */
    OSM.switchView(map);

    /**
     * Add image overlay
     */
    OSM.imageOverlay(map);

    /**
     * Initialize third party plugins
     */
    OSM.plugin(map);
  },

  imageOverlay: function(e) {
    /**
     * fit images into their appropriate boundaries (https://www.tutorialspoint.com/leafletjs/leafletjs_overlay.htm)
     * places available:
     * i, Ferney OpenTrack
     *
     * @param {object} e - the actual map
     */

    // L.marker(OSM.el.imageBoundaries.ferneyOpenTrack.top).addTo(e);
    // L.marker(OSM.el.imageBoundaries.ferneyOpenTrack.bottom).addTo(e);
    // var imageBounds = [OSM.el.imageBoundaries.ferneyOpenTrack.top, OSM.el.imageBoundaries.ferneyOpenTrack.bottom];
    // L.imageOverlay(OSM.el.imageBoundaries.ferneyOpenTrack.img, imageBounds).addTo(e);
    // L.imageOverlay(OSM.el.imageBoundaries.ferneyOpenTrack.img, imageBounds).bringToFront();

    /**
     * loop through out the imageBoundaries then display the appropriate image
     * more image to add? add in the object OSM.el.imageBoundaries
     */
    for (var key in OSM.el.imageBoundaries) {
      if (!OSM.el.imageBoundaries.hasOwnProperty(key)) continue;
      var obj = OSM.el.imageBoundaries[key];

      // L.marker(obj.top).addTo(e);
      // L.marker(obj.bottom).addTo(e);
      var imageBounds = [obj.top, obj.bottom];
      L.imageOverlay(obj.img, imageBounds).addTo(e);
      L.imageOverlay(obj.img, imageBounds).bringToFront();
    }
  },

  switchView: function(e) {
    /**
     * layer control : https://leafletjs.com/examples/layers-control/
     *
     * @param {object} e - the actual map
     */
    var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
    var baseMaps = {
      "OpenStreetMap": osm,
      "Esri World Imagery": esri
    };
    var overlays =  {//add any overlays here

    };
    L.control.layers(baseMaps,overlays, {position: 'topright'}).addTo(e);
  },

  plugin: function(e) {
    /**
     * Locate : https://www.domoritz.de/leaflet-locatecontrol/
     *
     * @param {object} e - the actual map
     */
    var lc = L.control.locate().addTo(e);
    //lc.start();
  }

};

OSM.init();