
var io = require("socket.io-client")

	
var sensorID = 0;
//THIS WORKS!!
var socket = io.connect("http://0.0.0.0:3006", { query:"type=producer&ID="+sensorID });


socket.on("connect", function(serverSocket){
	console.log("PSEUDOCLIENT: Test socket 1 Successfully connected");
	generateData();
});


var counter = 100;

function generateData(){

	socket.emit('INsensor'+String(sensorID), 100 - counter);
	counter--;
	if(counter > 0){
		setTimeout(generateData, 5000);
	}
}