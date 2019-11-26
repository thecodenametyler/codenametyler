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
    gpx: {
      files: [
        {
          url : 'TrailRun20190727080015.gpx',
          name : 'UTRB 2019 - 25 km',
          boundaries : [[-20.509252, 57.544858], [-20.449367, 57.704510]]
        },
        {
          url : 'TrailRun20190811084459.gpx',
          name : 'Heritage - 21 km',
          boundaries : [[-20.501111, 57.440865], [-20.505369, 57.412095]]
        },
        {
          url : 'TrailRun20190824073035.gpx',
          name : 'Black River Trail Run',
          boundaries : [[-20.446312, 57.342148], [-20.455186, 57.345660]]
        },
        {
          url : 'TrailRun20190907053315.gpx',
          name : 'Ferney Trail Run',
          boundaries : [[-20.361671, 57.705657], [-20.362011, 57.705933]]
        },
        {
          url : 'TrailRun20190921080035.gpx',
          name : 'Parakeet x 2',
          boundaries : [[-20.383311, 57.421017], [-20.383517, 57.421285]]
        },
        {
          url : 'TrailRun20191005073737.gpx',
          name : 'Moka Trail Run',
          boundaries : [[-20.208511, 57.561048], [-20.209446, 57.557135]]
        }
      ],
      path : 'import/gpx/'
    },
    mapType: {
      osm : {
        label: '<strong>OpenStreetMap</strong>',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      },
      esi : {
        label: '<strong>Esri World Imagery</strong>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      },
      otm : {
        label: '<strong>OpenTopoMap</strong>',
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attr: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
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
     * Add trail selector
     * load different gpx files
     */
    OSM.switchTrail(map);

    /**
     * Add ability to switch view from :
     * OSM / Esri
     */
    OSM.switchView(map);

    
    if(OSM.config.debug.imagery) {
      /**
       * Add image overlay
       */
      OSM.imageOverlay(map);
    }

    /**
     * Initialize third party plugins
     */
    OSM.plugin(map);

    /**
     * Import ALL GPXs
     *
     * plugin used https://github.com/mapbox/leaflet-omnivore
     */
    OSM.importGpxAll(map);
  },

  switchTrail: function(e) {
    /**
     * Ability to switch tracks
     *
     * @param {object} e - the actual map
     */

    var legend = L.control({position: 'topright'});

    legend.onAdd = function (e) {
      var options = '<option value="">Choose a trail</option>';
      OSM.el.gpx.files.forEach(function (item, index) {
        options += '<option value="'+index+'">'+item.name+'</option>';
      });

      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <select class="select-css" id="switchTrail">
        `+options+`
        </select>
      `;
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
    };

    legend.addTo(e);

    addEventHandler(document, 'DOMContentLoaded', function() {
      addEventHandler(document.getElementById('switchTrail'), 'change', function() {
        if(this.value !== "") {
           //https://leafletjs.com/reference-1.5.0.html#fitbounds-options
           // focus map on specific trail
           e.fitBounds(OSM.el.gpx.files[this.value].boundaries);
        }
      });
    });
  },

  importGpxAll: function(e) {
    /**
     * plugin used https://github.com/mapbox/leaflet-omnivore
     *
     * @param {object} e - the actual map
     */
    var progress = 1;
    OSM.el.gpx.files.forEach(function (item, index) {
      var customLayer = L.geoJson(null, {
        // http://leafletjs.com/reference.html#geojson-style
        style: function(feature) {
          return { color: '#000' };
        }
      });
      var runLayer = omnivore.gpx(OSM.el.gpx.path+item.url, null, customLayer)
      .on('ready', function() {
        progress++;
        // e.fitBounds(runLayer.getBounds());
        var loaderText = document.getElementById('osm-map__loader__text__name');
        loaderText.innerHTML = item.name;

        var loaderStatus = document.getElementById('osm-map__loader__text_status');
        loaderStatus.innerHTML = progress + " of " + OSM.el.gpx.files.length;

        if(progress == OSM.el.gpx.files.length) {
          setTimeout(function(){
            var loader = document.getElementById('osm-map__loader');
            loader.classList.add('hide');
          }, 500);
        }
      })
      .on('error', function() {
          // fired if the layer can't be loaded over AJAX
          // or can't be parsed
          alert(item.name + ": could be initialized.");
      })
      .addTo(e);
    });
    progress = 0;
  },

  importGpx: function(e, index) {
    /**
     * plugin used https://github.com/mapbox/leaflet-omnivore
     *
     * @param {object} e - the actual map
     * @param {int} index - the index of array to be loaded
     */
    // Load gpx file
    var customLayer = L.geoJson(null, {
      // http://leafletjs.com/reference.html#geojson-style
      style: function(feature) {
        return { color: '#000' };
      }
    });
    var runLayer = omnivore.gpx(OSM.el.gpx.path+OSM.el.gpx.files[index].url, null, customLayer)
    .on('ready', function() {
      e.fitBounds(runLayer.getBounds());
    })
    .on('error', function() {
        // fired if the layer can't be loaded over AJAX
        // or can't be parsed
          alert(OSM.el.gpx.files[index].name + ": could be initialized.");
    });
    //.addTo(e);
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
    esri = L.tileLayer(OSM.el.mapType.esi.url, {attribution: OSM.el.mapType.esi.attr}),
    otm = L.tileLayer(OSM.el.mapType.otm.url, {attribution: OSM.el.mapType.otm.attr});
    var baseMaps = {
      "<strong>OpenStreetMap</strong>": osm,
      "<strong>Esri World Imagery</strong>": esri,
      "<strong>OpenTopoMap</strong>": otm
    };

    var ferneyOpenTrackConfig = OSM.el.imageBoundaries.ferneyOpenTrack;
    var ferneyOpenTrackBounds = [ferneyOpenTrackConfig.top, ferneyOpenTrackConfig.bottom];
    var ferneyOpenTrack = L.imageOverlay(ferneyOpenTrackConfig.img, ferneyOpenTrackBounds);
    var overlayMaps = {
      "Ferney Open Track": L.layerGroup([ferneyOpenTrack])
    };

    L.control.layers(baseMaps,overlayMaps, {position: 'topright'}).addTo(e);
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

function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener)
    elem.addEventListener (eventType, handler, false);
  else if (elem.attachEvent)
    elem.attachEvent ('on' + eventType, handler);
}

OSM.init();