var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        title: 'Open Street Map',
        source: new ol.source.OSM(),
        visible: true,
      }),
     new ol.layer.Tile({
       title:'india_states',
        visible: true,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/drms/wms',
          params: {
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": '',
                "LAYERS": 'drms:india_states',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 68.09347534179688 + "," + 6.754367828369141
          }
        })
      }),
      new ol.layer.Tile({
        title:'imd_shapefile',
        visible: false,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/imd_shapefile/wms',
          params: {
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": '',
                "LAYERS": 'imd_shapefile:140_school_pg',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 72.9477767944336 + "," + 10.923301696777344
          }
        })
      }),
      new ol.layer.Tile({
        title:'Rainfall',
        visible: false,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/Rainfall/wms',
          params: { 
                   'VERSION': '1.1.1',
                   tiled: true,
                "STYLES": '',
                "LAYERS": 'Rainfall:Rainfall_7',
                "exceptions": 'application/vnd.ogc.se_inimage',
             tilesOrigin: 68.78 + "," + 7.98
          }
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([78.776032, 23.766398]),
      zoom: 4.5
    })
  })
//map.addLayer(shapefile_group);



 var layerSwitcher = new ol.control.LayerSwitcher({
     activationMode: 'click',
     startActive: false,
     groupSelectStyle: 'children'
 });

//map.addControl(layerSwitcher);

function toggleLayer(eve) {
    var lyrname = eve.target.value;
    var checkedStatus = eve.target.checked;
    var lyrList = map.getResolution();

    lyrList.forEach(function(element){
        if (lyrname == element.get('title')){
            element.setVisible(checkedStatus);
        }
    });
}

//map.addpopup(feature layer);

var conatiner = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


var overlay = new Overlay({
  element: conatiner,
  autoPan: true,
  autoPanAnimation: {
  duartion: 250,
  },
});


closer.onclick = function(){
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Add a click handler to the map to render the popup.
 */

 map.on('singleclick', function(evt) {
  document.getElementById('nodelist').innerHTML = "Loading... please wait...";
  var view = map.getView();
  var viewResolution = view.getResolution();
  var source = untiled.get('visible') ? untiled.getSource() : tiled.getSource();
  var url = source.getGetFeatureInfoUrl(
    evt.coordinate, viewResolution, view.getProjection(),
    {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
  if (url) {
    document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
  }
});


