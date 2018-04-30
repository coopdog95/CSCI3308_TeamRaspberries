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
var bar_chart_TEMP;
var bar_chart_HUMI;
var dataPointsTEMP;
var dataPointsHUMI;
var sensorColorTEMP, sensorColorHUMI;
var dpsTEMP, dpsHUMI;
var funstuffTEMP, funstuffHUMI;
var updateChart = function (humidity,temperature,date,time) {};
// var renderCharts = function() {};
//-----------------------------------------------------------------------------
window.onload = function() {
  // Socket Code
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
  // funstuffTEMP = [{y : 0}];
  // funstuffHUMI = [{y : 0}];

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
  bar_chart_TEMP = new CanvasJS.Chart("BarChartContainer_TEMP", {
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
  bar_chart_HUMI = new CanvasJS.Chart("BarChartContainer_HUMI", {
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
  var upperMid = 31;
  var lowerMid = 29;
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
    bar_chart_TEMP.options.data[0].dataPoints[0] = {label: "Sensor 1" , y: data_temperature, color: sensorColorTEMP};
    bar_chart_TEMP.options.title.text = "Live Temperature Readings";

    sensorColorHUMI = (data_humidity > upperExtreme || data_humidity < lowerExtreme) ? "#DD0000" : (data_humidity >= upperMid || data_humidity <= lowerMid) ? "#FFCA33" : "#6B8E23";
    bar_chart_HUMI.options.data[0].dataPoints[0] = {label: "Sensor 1" , y: data_humidity/1000, color: sensorColorHUMI};
    bar_chart_HUMI.options.title.text = "Live Humidity Readings";
    //-----------------------------------------------------------------------------
    console.log("Humidity: ", bar_chart_HUMI.options.data[0].dataPoints[0]["y"]);
  };
  var renderCharts = function() {
    var randTEMP = data_temperature + Math.round(2 + Math.random() * (-2 - 2));
    var randHUMI = data_humidity + Math.round(1 + Math.random() * (-1 - 1));
    // console.log(randTEMP);
    dataPointsTEMP.push({y : randTEMP});
    dataPointsHUMI.push({y : randHUMI});
    //sensorColorTEMP = (randTEMP > upperExtreme || randTEMP < lowerExtreme) ? "#DD0000" : (randTEMP >= upperMid || randTEMP <= lowerMid) ? "#FFCA33" : "#6B8E23";
    bar_chart_TEMP.options.data[0].dataPoints[0] = {label: "Sensor 1" , y: randTEMP, color: sensorColorTEMP};
    bar_chart_TEMP.options.title.text = "Live Temperature Readings";
    //sensorColorHUMI = (randHUMI > 3 || randHUMI < 2) ? "#DD0000" : (randHUMI >= 2.8 || randHUMI <= 2.2) ? "#FFCA33" : "#6B8E23";
    bar_chart_HUMI.options.data[0].dataPoints[0] = {label: "Sensor 1" , y: randHUMI/1000, color: sensorColorHUMI};
    bar_chart_HUMI.options.title.text = "Live Humidity Readings";


    line_chart_TEMP.render();
    line_chart_HUMI.render(); 
    bar_chart_TEMP.render(); 
    bar_chart_HUMI.render();
  }
  //-----------------------------------------------------------------------------
  setInterval(function(){renderCharts()}, 3000);
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------