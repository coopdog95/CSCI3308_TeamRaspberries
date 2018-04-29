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
var chart;
var dataPoints;
var data_humidity;
var data_temperature;
var data_date;
var data_time;
var updateChart = function (humidity,temperature,date,time) {};
var line_chart_TEMP;
var line_chart_HUMI;
var dataPointsTEMP;
var dataPointsHUMI;
//-----------------------------------------------------------------------------
window.onload = function() {
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
      dataPoints: [
        { label: "sensor1", y: 22 },
      ]
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
      dataPoints: [
        { label: "sensor1", y: 0.22 },
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
    upperExtreme = Number(prompt("Upper emergency boundary for temperature:", "°F"));
    upperMid = Number(prompt("Upper warning boundary for temperature:", "°F"));
    lowerMid = Number(prompt("Lower warning boundary for temperature:", "°F"));
    lowerExtreme = Number(prompt("Lower emergency boundary for temperature:", "°F"));
    console.log(upperExtreme,upperMid,lowerMid,lowerExtreme);
  }
  document.getElementById("changeBounds").addEventListener("click", userChangeBounds);
//-----------------------------------------------------------------------------
  var yVal1 = 25;
  updateChart = function (humidity,temperature,date,time) {
    data_humidity = Number(humidity);
    data_temperature = Number(temperature);
    data_date = date;
    data_time = time;

    yVal1 = yVal1 + Math.round(2 + Math.random() * (-2 - 2));
    dataPointsTEMP.push({y : data_temperature});
    dataPointsHUMI.push({y : data_humidity});

    yValsTEMP = [yVal1]
    yValsHUMI = [yVal1]

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
    var sensorColor, deltaY;
    var dps = bar_chart_TEMP.options.data[0].dataPoints;
    var dpsh = bar_chart_HUMI.options.data[0].dataPoints;
    for (var i = 0; i < dps.length; i++) {
      deltaY = Math.round(2 + Math.random() *(-2-2));
      sensorColor = (yValsTEMP[i] > upperExtreme || yValsTEMP[i] < lowerExtreme) ? "#DD0000" : (yValsTEMP[i] >= upperMid || yValsTEMP[i] <= lowerMid) ? "#FFCA33" : "#6B8E23";
      dps[i] = {label: "Sensor "+(i+1) , y: yValsTEMP[i], color: sensorColor};
      dpsh[i] = {label: "Sensor "+(i+1) , y: yValsHUMI[i]/100, color: sensorColor};
    }

    bar_chart_TEMP.options.data[0].dataPoints = dps;
    bar_chart_TEMP.options.title.text = "Live Temperature Readings";
    bar_chart_HUMI.options.data[0].dataPoints = dpsh;
    bar_chart_HUMI.options.title.text = "Live Humidity Readings";

    line_chart_TEMP.render(); 
    bar_chart_TEMP.render(); 
    line_chart_HUMI.render();
    bar_chart_HUMI.render();
  };
//-----------------------------------------------------------------------------
}

// // use this to view the whole database. 
// con.connect(function(err) {
//   con.query("SELECT id FROM markers", function (err, result, fields) {
//     console.log(result);
//   });
// });


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