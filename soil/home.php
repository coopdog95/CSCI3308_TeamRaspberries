<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>PROJECT PAGE</title>
    <!-- Bootstrap core CSS -->
    <link href="/javascript/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- this is for the on off button -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <style>
      body {
        padding-top: 54px;
      }
      @media (min-width: 992px) {
        body {
          padding-top: 56px;
        }
      }
      #map {
        height: 600px;
        width: 100%;
      }
      #floating-panel {
        position: absolute;
        top: 100px;
        left: 25%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
      }
    </style>
    <script src="/javascript/socket.io.js"></script>
    <script> 

      //I commented this out so it won't
      //open a socket everytime you 
      //connect while develeloping

      // //depends on the above socket.io.js file
      // var streamSocket = io("http://0.0.0.0:3006");

      // //Initial connection
      // streamSocket.on("connect", function(){
      //   console.log("CLIENT: Successfully connected to port 3002");
      //   });

      // //Accept stream
      // streamSocket.on("to C1", function(data){
      //   console.log("CLIENT: data received: ", data);
      // })

    </script>
    <script src="/javascript/dynamicPlot.js"></script>
  </head>
  <body style="overflow: hidden;">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Moisture and Temp Data</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="index.php">Log in</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Plant Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">User</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page Content -->
    <div class="row align-items-center">
      <div class="col-5">
        <table class="table table-hover" style="height: 370px;">
          <thead>
            <tr>
              <th>User</th>
              <th>Device number</th>
              <th>LAT/LONG</th>
              <th>Temperature</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>5</td>
              <td>lat: 44.32955, lng: -74.12385</td>
              <td>65</td>
              <td>22%</td>
            </tr>
                        <tr>
              <td>Tom</td>
              <td>5</td>
              <td>lat: 44.32955, lng: -74.12385</td>
              <td>65</td>
              <td>22%</td>
            </tr>
                        <tr>
              <td>Betty</td>
              <td>5</td>
              <td>lat: 44.32955, lng: -74.12385</td>
              <td>65</td>
              <td>22%</td>
            </tr>
           
          </tbody>
        </table>
      </div>
      
      <div id="chartContainer" class="col-6" style="height: 370px; max-width: 100%; margin-right: auto;"></div>
      <script src="/javascript/canvasjs.min.js"></script>
    </div>
    
    <!-- This is the drop down links menu  -->
    <div class="row align-items-center" >
      <div class="col-auto" style="background-color: white;"></div>
      <div class="col-auto" style="background-color: white;">
        <div style="background-color: white;" class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Pin settings
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a onclick="clearMarkers();" class="dropdown-item" href="#">Hide markers</a>
            <a onclick="showMarkers();" class="dropdown-item" href="#">Show All Markers</a>
            <a onclick="deleteMarkers();" class="dropdown-item" href="#">Delete Markers</a>
          </div>
        </div>
      </div>
    </div>
      <!--  pin on off functionality not sure if i want to use this  -->
        <!--<style>.slow .toggle-group { transition: left 0.7s; -webkit-transition: left 0.7s; }</style>
        <div>
          <input type="checkbox" checked data-toggle="toggle" data-on="Drop<br>Pins" data-off="Stop<br>Droping" data-style="slow">
        </div> -->
      <!-- this is the actual map portion of the sight  -->
    <div id="map" style="bottom: 0; position: absolute; max-height: 50%; width: 100%">
      <script>
        // In the following example, markers appear when the user clicks on the map.
        // The markers are stored in an array.
        // The user can then click an option to hide, show or delete the markers.
        var map;
        var markers = [];
        function initMap(){
        var saranac_lake = {lat: 44.32955, lng: -74.12385};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: saranac_lake,
          mapTypeId: 'satellite'
        });
        
        
        
        // This event listener will call addMarker() when the map is  clicked.
        map.addListener('click', function(event) {
          addMarker(event.latLng);
        });
        // Adds a marker at the center of the map.
        addMarker(saranac_lake);
        
        // this is might be used to have pop up info when clicking on the markers
        // var contentString = '<div id="content">'+
          // '<div id="siteNotice">'+
          // '</div>'+
        // '(last visited June 22, 2009).</p>'+
          // '</div>'+
        // '</div>';
        // var infowindow = new google.maps.InfoWindow({
        // content: contentString,
        // maxWidth: 200
        // });
        // var marker = new google.maps.Marker({
        //   position: uluru,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });
        // marker.addListener('click', function() {
        // infowindow.open(map, marker);
        // });
        }
        // Adds a marker to the map and push to the array.
        function addMarker(location) {
          var marker = new google.maps.Marker({
            position: location,
            map: map
          });
          markers.push(marker);
        }
        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }
        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
          setMapOnAll(null);
        }
        // Shows any markers currently in the array.
        function showMarkers() {
          setMapOnAll(map);
        }
        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
          clearMarkers();
          markers = [];
        }
      </script>
    </div>
    <!-- Bootstrap core JavaScript -->
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqN2YxslDwws1XnI89hc_l_KEO5QCNeSg&callback=initMap">
    </script>
    <script src="/javascript/vendor/jquery/jquery.min.js"></script>
    <script src="/javascript/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
  </body>
</html>