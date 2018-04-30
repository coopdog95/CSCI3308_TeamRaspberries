<!-- <?php
session_start();
$userID = $_SESSION["userID"];
////Once everyone has accounts, only users can access the home.php page.
// if(empty($userID)){
//   heading("index.php");
// }

?> -->
<!-- this is for the map -->
<?php 
$command = escapeshellcmd('tempmap.py');
$output = shell_exec($command);
echo $output;
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>PROJECT HOME PAGE</title>
    <!-- Bootstrap core CSS -->
    <link href="/javascript/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- this is for the on off button -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <!-- Current weather stuff from lab 7 -->
    <script src="http://code.jquery.com/jquery-2.2.0.js"></script>
    <script> 
      // Weather
      $(document).ready(function() {
        var url = 'https://api.forecast.io/forecast/2f658dadf40d90a34f953d0e92dab8c9/40.014984,-105.270546';
        $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
           $("#temp").text((data.currently.temperature).toFixed(1) + " °F");
           $("#humidity").text(data.currently.humidity + "%");
         });
       });
    </script>
    <!-- Custom styles for this template -->
    <style>
      body {
        padding-top: 54px;
      }
      @media (min-width: 992px) {
        body {
          padding-top: 56px;
        }
        .container {
          max-height: 10%;
        }
      }
      button {
        margin: 2% 18%;
      }
    </style>
    <script src="javascript/socket.io.js"></script>
    <script src="javascript/dynamicPlot.js"></script>
    <script> 
    
      // // var userID = "<?php echo $userID ?>";
      // var requestedSensorID = 88;
      // var cnt = 0;
      // // I commented this out so it won't
      // // open a socket everytime you 
      // // connect while develeloping

      // // requires the above socket.io.js file
      // // and dynamicPlot.js's updateChart() 
      // // function

      // // Port for the stream to connect
      // var streamSocket = io("http://0.0.0.0:3008", { query: "type=consumer&ID="+userID+"&requestedSensorID="+String(requestedSensorID)
      // });

      // //Initial connection
      // streamSocket.on("connect", function(){
      //   console.log("CLIENT: Successfully connected to port 3002");
      // });

      // //Ready to accept data on the event "to C1"
      // streamSocket.on("OUTsensor" + requestedSensorID, function(data){
      //   console.log("CLIENT: data received: ", data);
      // });

      // // console.log("data" + userID)
      // streamSocket.on("data", function(data){
      //   updateChart(data["temp"],data["humidity"],data["testDate"],data["testTime"]);
      //   console.log(cnt++);
      // });

      // window.onbeforeunload = function () {
      //   streamSocket.emit('end');
      // };

      //renderCharts();
    </script>
  </head>

  <body style="margin-left: 10%; margin-right: 10%">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav pull-left">
            <li class="nav-item active">
              <a class="nav-link" href="home.php">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="viz_2.html">Map</a>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav pull-right"> 
            <li class="nav-item">
              <a class="nav-link" href="index.php"><img src="resources/userlogin.png" alt="User" style="width:4%; float: right; opacity: 0.5"></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page Content -->
    <div class="row align-items-center">
      <div id="BarChartContainer_TEMP" class="col-5" style="height: 370px; max-width: 100%; margin-left: auto;"></div>
      <div id="chartContainer_TEMP" class="col-6" style="height: 370px; max-width: 100%; margin-right: auto;"></div>
      <div id="BarChartContainer_HUMI" class="col-5" style="height: 370px; max-width: 100%; margin-left: auto;"></div>
      <div id="chartContainer_HUMI" class="col-6" style="height: 370px; max-width: 100%; margin-right: auto;"></div>
      <script src="/javascript/canvasjs.min.js"></script>
      <button id="changeBounds" type="button" class="btn btn-outline-dark">Change Bar Color Boundaries</button>
      <div style="margin: 0 1%">
        <h4><b>Outside temperature:</b></h4> <p id="temp">Loading . . .</p>
      </div>
      <div>
        <h4><b>Outside humidity:</b></h4>    <p id="humidity">Loading . . .</p>
      </div>
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