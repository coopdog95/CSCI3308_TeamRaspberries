<<<<<<< HEAD
<?php
$servername = "den1.mysql6.gear.host";
$username = "proj";
$password = "password.";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>


// cnx = mysql.connector.connect(user='proj', password='password.',
//                               host='den1.mysql6.gear.host',
//                               database='proj')
=======
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
  Defining the chart and data point outside
  the scope of the below function, so that 
  it is visible to the socket script in home.php
  under the dynamicPlot.js. 
  These two variables will be used in the updateChart function
  (also should be moved outside the below function's
  scope), which will be called by the stream when the arduino
  (or whatever connects to the socket) is called.
*/
//-----------------------------------------------------------------------------
// Global Variables
var chart;
var dataPoints;
var data_humidity;
var data_temperature;
var data_date;
var data_time;
var line_chart_TEMP;
var line_chart_HUMI;
var dataPointsTEMP;
var dataPointsHUMI;
var sensorColorTEMP, sensorColorHUMI;
var dpsTEMP, dpsHUMI;
var updateChart = function (humidity,temperature,date,time) {};
var renderCharts = function() {};
//-----------------------------------------------------------------------------
window.onload = function() {
      var requestedSensorID = 88;
      var cnt = 0;
      // I commented this out so it won't
      // open a socket everytime you 
      // connect while develeloping

      // requires the above socket.io.js file
      // and dynamicPlot.js's updateChart() 
      // function

      // Port for the stream to connect
      var streamSocket = io("http://0.0.0.0:3008", { query: "type=consumer&ID="+'1'+"&requestedSensorID="+String(requestedSensorID)
      });

      //Initial connection
      streamSocket.on("connect", function(){
        console.log("CLIENT: Successfully connected to port 3002");
      });

      //Ready to accept data on the event "to C1"
      streamSocket.on("OUTsensor" + requestedSensorID, function(data){
        console.log("CLIENT: data received: ", data);
      });

      // console.log("data" + userID)
      streamSocket.on("data", function(data){
        updateChart(data["temp"],data["humidity"],data["testDate"],data["testTime"]);
        console.log(cnt++);
      });

      window.onbeforeunload = function () {
        streamSocket.emit('end');
      };
//-----------------------------------------------------------------------------     
  dataPointsTEMP = [{y : 0}];
  dataPointsHUMI = [{y : 0}];

  line_chart_TEMP = new CanvasJS.Chart("chartContainer_TEMP", {
      title : {
        text: "Loading . . ."
      },
      axisX:{
        title: "",
        //valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        suffix: " °F",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      toolTip:{
        shared:true
      },
      data : [{
        type: "line",
        showInLegend: false,
        name: "Sensor 1",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DD0000",
        dataPoints : dataPointsTEMP
      }]
  });
//-----------------------------------------------------------------------------
  var bar_chart_TEMP = new CanvasJS.Chart("BarChartContainer_TEMP", {
    title: {
      text: "Loading . . ."
    },
    axisY: {
      title: "Temperature",
      suffix: " °F"
    },
    data: [{
      type: "column", 
      yValueFormatString: "#,###.## °F",
      indexLabel: "{y}",
      dataPoints: [{
        label: "sensor1",
        y: 1
      }]
    }]
  });
//-----------------------------------------------------------------------------
  line_chart_HUMI = new CanvasJS.Chart("chartContainer_HUMI", {
      title : {
        text: "Loading . . ."
      },
      axisX:{
        title: "Time (seconds)",
        //valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        suffix: "%",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      toolTip:{
        shared:true
      },
      data : [{
        type: "line",
        showInLegend: true,
        name: "Sensor 1",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DD0000",
        dataPoints : dataPointsHUMI
      }]
  });
//-----------------------------------------------------------------------------
  var bar_chart_HUMI = new CanvasJS.Chart("BarChartContainer_HUMI", {
    title: {
      text: "Loading . . ."
    },
    axisY: {
      title: "Humidity",
      valueFormatString: "###.##%"
    },
    data: [{
      type: "column", 
      yValueFormatString: "###.##%",
      indexLabel: "{y}",
      dataPoints: [{
        label: "Sensor 1",
        y: 1
      }]
    }]
  });
//-----------------------------------------------------------------------------
  line_chart_TEMP.render();
  bar_chart_TEMP.render();
  line_chart_HUMI.render();
  bar_chart_HUMI.render();
//-----------------------------------------------------------------------------  
  var upperExtreme = 35;
  var upperMid = 32;
  var lowerMid = 18;
  var lowerExtreme = 15;
//-----------------------------------------------------------------------------
  var userChangeBounds = function() {
    console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
    upperExtreme = Number(prompt("Upper emergency boundary for temperature:", "°F"));
    upperMid = Number(prompt("Upper warning boundary for temperature:", "°F"));
    lowerMid = Number(prompt("Lower warning boundary for temperature:", "°F"));
    lowerExtreme = Number(prompt("Lower emergency boundary for temperature:", "°F"));
    console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
  }
  document.getElementById("changeBounds").addEventListener("click", userChangeBounds);
//-----------------------------------------------------------------------------
  updateChart = function (humidity,temperature,date,time) {
    data_humidity = Number(humidity);
    data_temperature = Number(temperature);
    data_date = date;
    data_time = time;
    
    dataPointsTEMP.push({y : data_temperature});
    dataPointsHUMI.push({y : data_humidity});

    var d = new Date();
    var month = (d.getMonth() < '10') ? ('0' + d.getMonth()) : d.getMonth();
    var day = (d.getDate() < '10') ? ('0' + d.getDate()) : d.getDate();
    var year = (d.getFullYear() < '10') ? ('0' + d.getFullYear()) : d.getFullYear();
    var hour = (d.getHours() < '10') ? ('0' + d.getHours()) : d.getHours();
    var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
    var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();    
    line_chart_TEMP.options.title.text = "Temperature History as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    line_chart_HUMI.options.title.text = "Humidity History as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    //-----------------------------------------------------------------------------
    sensorColorTEMP = (data_temperature > upperExtreme || data_temperature < lowerExtreme) ? "#DD0000" : (data_temperature >= upperMid || data_temperature <= lowerMid) ? "#FFCA33" : "#6B8E23";
    bar_chart_TEMP.options.data[0].dataPoints = {y: data_temperature, color: sensorColorTEMP};
    bar_chart_TEMP.options.title.text = "Live Temperature Readings";

    sensorColorHUMI = (data_humidity > upperExtreme || data_humidity < lowerExtreme) ? "#DD0000" : (data_humidity >= upperMid || data_humidity <= lowerMid) ? "#FFCA33" : "#6B8E23";
    bar_chart_HUMI.options.data[0].dataPoints = {label: "Sensor 1" , y: data_humidity, color: sensorColorHUMI};
    bar_chart_HUMI.options.title.text = "Live Humidity Readings";
    //-----------------------------------------------------------------------------
    console.log("Humidity: ", bar_chart_HUMI.options.data[0].dataPoints["y"]);
  };
  renderCharts = function() {
    line_chart_TEMP.render();
    line_chart_HUMI.render(); 
    bar_chart_TEMP.render(); 
    bar_chart_HUMI.render();
  }
//-----------------------------------------------------------------------------
}
<<<<<<< HEAD

// // use this to view the whole database. 
// con.connect(function(err) {
//   con.query("SELECT id FROM markers", function (err, result, fields) {
//     console.log(result);
//   });
// });

>>>>>>> 919206eec441aa3aef3f2e80787e9c24243068e2


// //-----------------------------------------------------------------------------
// //-----------------------------------------------------------------------------
// /*
//   Defining the chart and data point outside
//   the scope of the below function, so that 
//   it is visible to the socket script in home.php
//   under the dynamicPlot.js. 
//   These two variables will be used in the updateChart function
//   (also should be moved outside the below function's
//   scope), which will be called by the stream when the arduino
//   (or whatever connects to the socket) is called.
// */
// var chart;
// var dataPoints;
// //-----------------------------------------------------------------------------
// window.onload = function() {
// //-----------------------------------------------------------------------------     
//   var dataPoints1 = [{y : 22}];
//   var dataPoints2 = [{y : 23}];
//   var dataPoints3 = [{y : 24}];
//   var dataPoints4 = [{y : 25}];
//   var dataPoints5 = [{y : 26}];
//   var dataPoints6 = [{y : 27}];
//   var line_chart_TEMP = new CanvasJS.Chart("chartContainer_TEMP", {
//       title : {
//         text: "Loading . . ."
//       },
//       axisX:{
//         title: "",
//         //valueFormatString: "DD MMM",
//         crosshair: {
//           enabled: true,
//           snapToDataPoint: true
//         }
//       },
//       axisY: {
//         suffix: " °F",
//         crosshair: {
//           enabled: true,
//           snapToDataPoint: true
//         }
//       },
//       toolTip:{
//         shared:true
//       },
//       data : [{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 1",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DD0000",
//         dataPoints : dataPoints1
//       },{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 2",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#00BB00",
//         dataPoints : dataPoints2
//       },{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 3",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#0000BB",
//         dataPoints : dataPoints3
//       },{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 4",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DD00BB",
//         dataPoints : dataPoints4
//       },{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 5",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#00BBBB",
//         dataPoints : dataPoints5
//       },{
//         type: "line",
//         showInLegend: false,
//         name: "Sensor 6",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DDBB00",
//         dataPoints : dataPoints6
//       }]
//   });
// //-----------------------------------------------------------------------------
//   var bar_chart_TEMP = new CanvasJS.Chart("BarChartContainer_TEMP", {
//     title: {
//       text: "Loading . . ."
//     },
//     axisY: {
//       title: "Temperature",
//       suffix: " °F"
//     },
//     data: [{
//       type: "column", 
//       yValueFormatString: "#,###.## °F",
//       indexLabel: "{y}",
//       dataPoints: [
//         { label: "sensor1", y: 22 },
//         { label: "sensor2", y: 23 },
//         { label: "sensor3", y: 24 },
//         { label: "sensor4", y: 25 },
//         { label: "sensor5", y: 26 },
//         { label: "sensor6", y: 27 },
//       ]
//     }]
//   });
// //-----------------------------------------------------------------------------
//   var line_chart_HUMI = new CanvasJS.Chart("chartContainer_HUMI", {
//       title : {
//         text: "Loading . . ."
//       },
//       axisX:{
//         title: "Time (seconds)",
//         //valueFormatString: "DD MMM",
//         crosshair: {
//           enabled: true,
//           snapToDataPoint: true
//         }
//       },
//       axisY: {
//         suffix: "%",
//         crosshair: {
//           enabled: true,
//           snapToDataPoint: true
//         }
//       },
//       toolTip:{
//         shared:true
//       },
//       data : [{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 1",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DD0000",
//         dataPoints : dataPoints1
//       },{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 2",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#00BB00",
//         dataPoints : dataPoints2
//       },{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 3",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#0000BB",
//         dataPoints : dataPoints3
//       },{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 4",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DD00BB",
//         dataPoints : dataPoints4
//       },{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 5",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#00BBBB",
//         dataPoints : dataPoints5
//       },{
//         type: "line",
//         showInLegend: true,
//         name: "Sensor 6",
//         //markerType: "none",
//         //xValueFormatString: "DD MMM, YYYY",
//         color: "#DDBB00",
//         dataPoints : dataPoints6
//       }]
//   });
// //-----------------------------------------------------------------------------
//   var bar_chart_HUMI = new CanvasJS.Chart("BarChartContainer_HUMI", {
//     title: {
//       text: "Loading . . ."
//     },
//     axisY: {
//       title: "Humidity",
//       valueFormatString: "###.##%"
//     },
//     data: [{
//       type: "column", 
//       yValueFormatString: "###.##%",
//       indexLabel: "{y}",
//       dataPoints: [
//         { label: "sensor1", y: 0.22 },
//         { label: "sensor2", y: 0.23 },
//         { label: "sensor3", y: 0.24 },
//         { label: "sensor4", y: 0.25 },
//         { label: "sensor5", y: 0.26 },
//         { label: "sensor6", y: 0.27 },
//       ]
//     }]
//   });
// //-----------------------------------------------------------------------------
//   line_chart_TEMP.render();
//   bar_chart_TEMP.render();
//   line_chart_HUMI.render();
//   bar_chart_HUMI.render();
// //-----------------------------------------------------------------------------  
//   var upperExtreme = 35;
//   var upperMid = 32;
//   var lowerMid = 18;
//   var lowerExtreme = 15;
// //-----------------------------------------------------------------------------
//   var userChangeBounds = function() {
//     console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
//     upperExtreme = Number(prompt("Upper emergency boundary for temperature:", "°F"));
//     upperMid = Number(prompt("Upper warning boundary for temperature:", "°F"));
//     lowerMid = Number(prompt("Lower warning boundary for temperature:", "°F"));
//     lowerExtreme = Number(prompt("Lower emergency boundary for temperature:", "°F"));
//     console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
//   }
//   document.getElementById("changeBounds").addEventListener("click", userChangeBounds);
// //-----------------------------------------------------------------------------
//   var yVal1 = 25;
//   var yVal2 = 25;
//   var yVal3 = 25;
//   var yVal4 = 25;
//   var yVal5 = 25;
//   var yVal6 = 25;
//   var updateChart = function () {
//     yVal1 = yVal1 + Math.round(2 + Math.random() * (-2 - 2));
//     yVal2 = yVal2 + Math.round(2 + Math.random() * (-2 - 2));
//     yVal3 = yVal3 + Math.round(2 + Math.random() * (-2 - 2));
//     yVal4 = yVal4 + Math.round(2 + Math.random() * (-2 - 2));
//     yVal5 = yVal5 + Math.round(2 + Math.random() * (-2 - 2));
//     yVal6 = yVal6 + Math.round(2 + Math.random() * (-2 - 2));
//     dataPoints1.push({y : yVal1});
//     dataPoints2.push({y : yVal2});
//     dataPoints3.push({y : yVal3});
//     dataPoints4.push({y : yVal4});
//     dataPoints5.push({y : yVal5});
//     dataPoints6.push({y : yVal6});

//     yValsTEMP = [yVal1,yVal2,yVal3,yVal4,yVal5,yVal6]
//     yValsHUMI = [yVal1,yVal2,yVal3,yVal4,yVal5,yVal6]

//     var d = new Date();
//     var month = (d.getMonth() < '10') ? ('0' + d.getMonth()) : d.getMonth();
//     var day = (d.getDate() < '10') ? ('0' + d.getDate()) : d.getDate();
//     var year = (d.getFullYear() < '10') ? ('0' + d.getFullYear()) : d.getFullYear();
//     var hour = (d.getHours() < '10') ? ('0' + d.getHours()) : d.getHours();
//     var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
//     var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();    
//     line_chart_TEMP.options.title.text = "Temperature History as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
//     line_chart_HUMI.options.title.text = "Humidity History as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
//     //-----------------------------------------------------------------------------
//     var sensorColor, deltaY;
//     var dps = bar_chart_TEMP.options.data[0].dataPoints;
//     var dpsh = bar_chart_HUMI.options.data[0].dataPoints;
//     for (var i = 0; i < dps.length; i++) {
//       deltaY = Math.round(2 + Math.random() *(-2-2));
//       sensorColor = (yValsTEMP[i] > upperExtreme || yValsTEMP[i] < lowerExtreme) ? "#DD0000" : (yValsTEMP[i] >= upperMid || yValsTEMP[i] <= lowerMid) ? "#FFCA33" : "#6B8E23";
//       dps[i] = {label: "Sensor "+(i+1) , y: yValsTEMP[i], color: sensorColor};
//       dpsh[i] = {label: "Sensor "+(i+1) , y: yValsHUMI[i]/100, color: sensorColor};
//     }
//     bar_chart_TEMP.options.data[0].dataPoints = dps;
//     bar_chart_TEMP.options.title.text = "Live Temperature Readings";
//     bar_chart_HUMI.options.data[0].dataPoints = dpsh;
//     bar_chart_HUMI.options.title.text = "Live Humidity Readings";

//     line_chart_TEMP.render(); 
//     bar_chart_TEMP.render(); 
//     line_chart_HUMI.render();
//     bar_chart_HUMI.render();
//   };
// //-----------------------------------------------------------------------------
//   setInterval(function(){updateChart()}, 1000);
// }


// ////Global definition of updateChart, callable from anywhere in home.php
// // var updateChart = function(yVal){

// //     var d = new Date();
// //     var month = d.getMonth();
// //     var day = d.getDate();
// //     var year = d.getFullYear();
// //     var hour = d.getHours();
// //     var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
// //     var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();
// //     //var time = d.getTime();
    
// //   dataPoints.push({y : yVal}); 
// //   chart.options.title.text = "Data as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
// //   chart.render();
// // } 
=======
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
>>>>>>> f17d6720dd5cc49beffbbe192733710d57d9e1aa
