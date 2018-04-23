
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

window.onload = function() {
  var dataPoints1 = [{y : 22}];
  var dataPoints2 = [{y : 23}];
  var dataPoints3 = [{y : 24}];
  var dataPoints4 = [{y : 25}];
  var dataPoints5 = [{y : 26}];
  var dataPoints6 = [{y : 27}];
  var line_chart_TEMP = new CanvasJS.Chart("chartContainer_TEMP", {
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
        suffix: " °C",
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
        dataPoints : dataPoints1
      },{
        type: "line",
        showInLegend: false,
        name: "Sensor 2",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#00BB00",
        dataPoints : dataPoints2
      },{
        type: "line",
        showInLegend: false,
        name: "Sensor 3",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#0000BB",
        dataPoints : dataPoints3
      },{
        type: "line",
        showInLegend: false,
        name: "Sensor 4",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DD00BB",
        dataPoints : dataPoints4
      },{
        type: "line",
        showInLegend: false,
        name: "Sensor 5",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#00BBBB",
        dataPoints : dataPoints5
      },{
        type: "line",
        showInLegend: false,
        name: "Sensor 6",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DDBB00",
        dataPoints : dataPoints6
      }]
  });
//-----------------------------------------------------------------------------
  var bar_chart_TEMP = new CanvasJS.Chart("BarChartContainer_TEMP", {
    title: {
      text: "Loading . . ."
    },
    axisY: {
      title: "Temperature",
      suffix: " °C"
    },
    data: [{
      type: "column", 
      yValueFormatString: "#,### °C",
      indexLabel: "{y}",
      dataPoints: [
        { label: "sensor1", y: 22 },
        { label: "sensor2", y: 23 },
        { label: "sensor3", y: 24 },
        { label: "sensor4", y: 25 },
        { label: "sensor5", y: 26 },
        { label: "sensor6", y: 27 }
      ]
    }]
  });
//-----------------------------------------------------------------------------
  var line_chart_HUMI = new CanvasJS.Chart("chartContainer_HUMI", {
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
        dataPoints : dataPoints1
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 2",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#00BB00",
        dataPoints : dataPoints2
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 3",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#0000BB",
        dataPoints : dataPoints3
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 4",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DD00BB",
        dataPoints : dataPoints4
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 5",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#00BBBB",
        dataPoints : dataPoints5
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 6",
        //markerType: "none",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#DDBB00",
        dataPoints : dataPoints6
      }]
  });
//-----------------------------------------------------------------------------
  var bar_chart_HUMI = new CanvasJS.Chart("BarChartContainer_HUMI", {
    title: {
      text: "Loading . . ."
    },
    axisY: {
      title: "Humidity",
      valueFormatString: "###%"
    },
    data: [{
      type: "column", 
      yValueFormatString: "###%",
      indexLabel: "{y}",
      dataPoints: [
        { label: "sensor1", y: 0.22 },
        { label: "sensor2", y: 0.23 },
        { label: "sensor3", y: 0.24 },
        { label: "sensor4", y: 0.25 },
        { label: "sensor5", y: 0.26 },
        { label: "sensor6", y: 0.27 }
      ]
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
    upperExtreme = Number(prompt("Upper emergency boundary:", "°C"));
    upperMid = Number(prompt("Upper warning boundary:", "°C"));
    lowerMid = Number(prompt("Lower warning boundary:", "°C"));
    lowerExtreme = Number(prompt("Lower emergency boundary:", "°C"));
    console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
  }
  document.getElementById("changeBounds").addEventListener("click", userChangeBounds);
//-----------------------------------------------------------------------------
  var yVal1 = 25;
  var yVal2 = 25;
  var yVal3 = 25;
  var yVal4 = 25;
  var yVal5 = 25;
  var yVal6 = 25;
  var updateChart = function () {
    yVal1 = yVal1 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints1.push({y : yVal1});
    yVal2 = yVal2 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints2.push({y : yVal2});
    yVal3 = yVal3 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints3.push({y : yVal3});
    yVal4 = yVal4 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints4.push({y : yVal4});
    yVal5 = yVal5 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints5.push({y : yVal5});
    yVal6 = yVal6 + Math.round(2 + Math.random() * (-2 - 2));
    dataPoints6.push({y : yVal6});

    yVals = [yVal1,yVal2,yVal3,yVal4,yVal5,yVal6]

    var d = new Date();
    var month = (d.getMonth() < '10') ? ('0' + d.getMonth()) : d.getMonth();
    var day = (d.getDate() < '10') ? ('0' + d.getDate()) : d.getDate();
    var year = (d.getFullYear() < '10') ? ('0' + d.getFullYear()) : d.getFullYear();
    var hour = (d.getHours() < '10') ? ('0' + d.getHours()) : d.getHours();
    var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
    var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();    
    line_chart_TEMP.options.title.text = "Temperature History as of:   " + month + "-" 
                                    + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    line_chart_HUMI.options.title.text = "Humidity History as of:   " + month + "-" 
                                    + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    //-----------------------------------------------------------------------------
    var sensorColor, deltaY;
    var dps = bar_chart_TEMP.options.data[0].dataPoints;
    var dpsh = bar_chart_HUMI.options.data[0].dataPoints;
    for (var i = 0; i < dps.length; i++) {
      deltaY = Math.round(2 + Math.random() *(-2-2));
      sensorColor = (yVals[i] > upperExtreme || yVals[i] < lowerExtreme) ? "#DD0000" : (yVals[i] >= upperMid || yVals[i] <= lowerMid) ? "#FFCA33" : "#6B8E23";
      dps[i] = {label: "Sensor "+(i+1) , y: yVals[i], color: sensorColor};
      dpsh[i] = {label: "Sensor "+(i+1) , y: yVals[i]/100, color: sensorColor};
    }
    bar_chart_TEMP.options.data[0].dataPoints = dps;
    bar_chart_TEMP.options.title.text = "Live Temperature Readings";
    bar_chart_HUMI.options.data[0].dataPoints = dpsh;
    bar_chart_HUMI.options.title.text = "Live Humidity Readings";

    bar_chart_TEMP.render();
    line_chart_TEMP.render();  
    line_chart_HUMI.render();
    bar_chart_HUMI.render();
  };
//-----------------------------------------------------------------------------
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