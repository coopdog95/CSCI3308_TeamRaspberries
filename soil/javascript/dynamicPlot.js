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
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------