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
  config: {
    sateliteDefault: false,
    debug: {
      imagery : false,
      kml : false
    }
  },
  el: {
    center: [-20.295813, 57.51352910000001],
    imageBoundaries: {
      ferneyOpenTrack: {
        top: [-20.329695, 57.695883],
        bottom: [-20.364450, 57.722130],
        img: 'images/trails/ferney-cutout-min.png'
      }
    },
    mapType: {
      osm : {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      },
      esi : {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
    if(OSM.config.sateliteDefault) {
      L.tileLayer(OSM.el.mapType.esi.url, {
          attribution: OSM.el.mapType.esi.attr
      }).addTo(map);
    } else {
      L.tileLayer(OSM.el.mapType.osm.url, {
        attribution: OSM.el.mapType.osm.attr
      }).addTo(map);
    }

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

    /**
     * Import KMLs
     *
     * plugin used https://github.com/windycom/leaflet-kml
     */
    OSM.importKml(map);
  },

  importKml: function(e) {
    /**
     * plugin used https://github.com/windycom/leaflet-kml
     *
     * @param {object} e - the actual map
     */
    // Load kml file
    fetch('import/kml/sample_path.kml')
      .then(res => res.text())
      .then(kmltext => {
        // Create new kml overlay
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmltext, 'text/xml');
        const track = new L.KML(kml);

        e.addLayer(track);

        L.marker(track.getBounds()._northEast).addTo(e);
        if(OSM.config.debug.kml) {
          // Adjust map to show the kml
          const bounds = track.getBounds();
          e.fitBounds(bounds);
        }
      });
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

      if(OSM.config.debug.imagery) {
        L.marker(obj.top).addTo(e);
        L.marker(obj.bottom).addTo(e);
      }
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
    var osm = L.tileLayer(OSM.el.mapType.osm.url, {attribution: OSM.el.mapType.osm.attr}),
    esri = L.tileLayer(OSM.el.mapType.esi.url, {attribution: OSM.el.mapType.esi.attr});
    var baseMaps = {
      "<strong>OpenStreetMap</strong>": osm,
      "<strong>Esri World Imagery</strong>": esri
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

    /**
     * activate location tracker form the start
     */
    //lc.start();
  }

};

OSM.init();