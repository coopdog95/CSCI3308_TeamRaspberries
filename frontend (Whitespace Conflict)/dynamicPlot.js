window.onload = function () {
  var dataPoints1 = [{y : 10}];
  var dataPoints2 = [{y : 9}];
  var dataPoints3 = [{y : 11}];
  var chart = new CanvasJS.Chart("chartContainer", {
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
        color: "#DD0000",
        dataPoints : dataPoints1
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 2",
        markerType: "square",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#00BB00",
        dataPoints : dataPoints2
      },{
        type: "line",
        showInLegend: true,
        name: "Sensor 3",
        markerType: "square",
        //xValueFormatString: "DD MMM, YYYY",
        color: "#0000BB",
        dataPoints : dataPoints3
      }]
    });

  chart.render();
  
  var yVal1 = 15;
  var yVal2 = 15;
  var yVal3 = 15;
  var updateChart = function () {
    yVal1 = yVal1 + Math.round(5 + Math.random() * (-5 - 5));
    dataPoints1.push({y : yVal1});
    yVal2 = yVal2 + Math.round(5 + Math.random() * (-5 - 5));
    dataPoints2.push({y : yVal2});
    yVal3 = yVal3 + Math.round(5 + Math.random() * (-5 - 5));
    dataPoints3.push({y : yVal3});  

    var d = new Date();
    var month = (d.getMonth() < '10') ? ('0' + d.getMonth()) : d.getMonth();
    var day = (d.getDate() < '10') ? ('0' + d.getDate()) : d.getDate();
    var year = (d.getFullYear() < '10') ? ('0' + d.getFullYear()) : d.getFullYear();
    var hour = (d.getHours() < '10') ? ('0' + d.getHours()) : d.getHours();
    var min = (d.getMinutes() < '10') ? ('0' + d.getMinutes()) : d.getMinutes();
    var sec = (d.getSeconds() < '10') ? ('0' + d.getSeconds()) : d.getSeconds();    
    chart.options.title.text = "Data as of:   " + month + "-" + day + "-" + year + " @ " + hour + ":" + min + ":" + sec;
    chart.render();    
    
  };

  // UPDATE CHART EVERY SECOND
  setInterval(function(){updateChart()}, 1000);
}