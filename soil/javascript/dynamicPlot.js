
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
var chart;
var dataPoints;

window.onload = function () {
  dataPoints = [{y : 10}];
  chart = new CanvasJS.Chart("chartContainer", {
      title : {
        text: "DATA F@#K YEAH" //CHANGE THIS
      },
      axisX:{
        title: "Time",
        //valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Random Data",
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
        markerType: "square",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints : dataPoints
      }]
    });

  chart.render();
  
  var yVal = 15;
  var updateChart = function () {
    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
    var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();
    //var time = d.getTime();
    
    //Append to the dataPoints array
    dataPoints.push({y : yVal}); 
        
    chart.options.title.text = "Data as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    chart.render();    
    
  };

  // UPDATE CHART EVERY SECOND
  setInterval(function(){updateChart()}, 1000);
}


////Global definition of updateChart, callable from anywhere in home.php
// var updateChart = function(yVal){

//     var d = new Date();
//     var month = d.getMonth();
//     var day = d.getDate();
//     var year = d.getFullYear();
//     var hour = d.getHours();
//     var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
//     var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();
//     //var time = d.getTime();
    
//   dataPoints.push({y : yVal}); 
//   chart.options.title.text = "Data as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
//   chart.render();
// } 