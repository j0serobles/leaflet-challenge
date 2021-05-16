# UCF Data Analysis And Visualization Bootcamp - Homework 17 - Geo Mapping - Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

In this homework, we have built a new set of tools that will allow the US Geological Survey (USGS) to visualize their earthquake data. We used a data set that contains earthquake data from the most recent 7 days and created maps using the Leaflet.js library.
 
## Tasks

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

The first task was to visualize an earthquake data set.

1. **Data Set**


   
   |Data Set               |    Source              |    Data Format        |   Size         |
   |-----------------------|:----------------------:|:---------------------:|---------------:|
   |   USGS GeoJSON Feed   |[Link To Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) | GeoJSON | 1555Kb |

2. **Import & Visualize the Data**

   * The Leaflet map plots all of the earthquakes from the data set, based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * Popups provide additional information about the earthquake when a marker is clicked, including its exact location, timestamp, intensity and depth.

   * A legend provides context for the map data, by showing the color intensity and the corresponding earthquake depth for the markers. 

- - -

### Level 2: More Data

![5-Advanced](Images/5-Advanced.png)

This second map illustrates the relationship between tectonic plates and seismic activity. A second data set was downloaded and displayed along side the original earthquake set of data. 

   |Data Set|Source|Data Format|Size|
   |--------|:----:|:---------:|---:|
   |Tectonic Plates|[Github Project](https://github.com/fraxen/tectonicplates)|GeoJSON|222Kb|


* A layer control element was added to this map to allow the showing of different base maps, and provide the user with the ability to turn the displaying of features on and off independently.

- - -

### How to run it.

You need to clone the homework repository in your local machine to be able to access the maps via a browser. 
Follow these steps to run the software:

1) Create a directory in your local machine, for example ```/home/<username>/Documents/leaflet-challenge/```.
2) ```cd``` to the directory and clone the Github repository with : ```git clone git@github.com:j0serobles/leaflet-challenge.git```
3) Two subdirectories will be created under the current directory, one for each step in the homework.  Run VS-Code
from the project top directory (``` /home/<username>/Documents/leaflet-challenge/```) by running ```$ code .```
4) From VS-Code, right click the ```Leaflet-Step-1/index.html``` and select "Run From Live Server".  The map 
will open in a separate browser window.
5) Repeat step 4 , this time opening file ```Leaflet-Step-2/index.html```  with Live Server to access the map
   for step 2. 