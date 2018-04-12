window.onload = function () {
    //var tmp = new Date();
    //var tmpTime = tmp.getTime();
  var dataPoints = [{y : 10}];
  var chart = new CanvasJS.Chart("chartContainer", {
      title : {
        text: " "
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
    var min = d.getMinutes();
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