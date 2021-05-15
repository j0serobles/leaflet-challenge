// Store our API endpoint inside queryUrl
var boundariesQueryUrl = "http://127.0.0.1:5501/Leaflet-Step-2/data/tectonicplates-master/GeoJSON/PB2002_boundaries.json";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get a value between 0 and 1 for marker opacity
function getOpacity(depth) {
    if (depth <= 70) {
      return(0.1);
    }
    else if (depth <= 300) {
      return (.5);
    }
    else if(depth <= 700) {
      return (.9); 
    }
    else {
      return (1); 
    }

}
// Perform a GET request to the query URLs
d3.json(queryUrl)
.then(function(data) {
  console.log(data);
  var earthquakeFeatures = data.features;
  d3.json(boundariesQueryUrl)
  .then(function(data) {
    // Once we get a response, send the earthquakesFeatures and boundariesFeatures objects to the createFeatures function
    console.log(data);
    var boundaryFeatures = data.features;
    createFeatures(earthquakeFeatures, boundaryFeatures);
  });
});

function createFeatures(earthquakeData, boundaryData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
      "<p>Magnitude:" + feature.properties.mag +", Depth (km):" + feature.geometry.coordinates[2] +"</p>"
      );
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature, 

    pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: feature.properties.mag * 6,
				fillColor: "#ff7800",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: getOpacity(feature.geometry.coordinates[2])
			});
		}

  });

  // Create a GeoJSON layer containing the features array on the boundaryData object
  var boundaries = L.geoJSON(boundaryData);

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes, boundaries);
}

function createMap(earthquakes, boundaries) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });
  

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satelite" : satellite
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    Boundaries : boundaries
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  // Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
 var div = L.DomUtil.create("div", "info legend"); 
  // Add min & max
  var legendInfo  = '<h3 style="text-align:center">Depth (KM)</h3>';
      legendInfo += '<i style="background: #ff7800; opacity:.1;"></i><span>0-70 (Shallow)</span><br>';
      legendInfo += '<i style="background: #ff7800; opacity:.5;"></i><span>70-300 (Intermed)</span><br>';
      legendInfo += '<i style="background: #ff7800; opacity:.9;"></i><span>300-700 (Deep)</span><br>';
  div.innerHTML   = legendInfo;
  return div;
};

  // Adding legend to the map
  legend.addTo(myMap);

}
