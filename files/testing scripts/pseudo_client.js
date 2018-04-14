
var io = require("socket.io-client")


//THIS WORKS!!
var socket = io.connect("http://0.0.0.0:3006")


socket.on("connect", function(serverSocket){
	console.log("Test socket 1 Successfully connected");
	generateData();
});


var counter = 100;

function generateData(){

	socket.emit('from S1', 'changed this, here is a number:' + counter);
	counter--;
	if(counter > 0){
		setTimeout(generateData, 5000);
	}
}