<?php
	
	require_once 'vendor/autoload.php';

	use Workerman\Worker;
	use PHPSocketIO\SocketIO;



	/*This successfully accepts data from some client
	then sends it to a user with home.php open.
	So the data can now go like this:
	(arduino -> server -> client) 
	all real time.*/
	$ServerSideSocket = new SocketIO(3006);

	$ServerSideSocket->on('connection', function($Incoming)use($ServerSideSocket){
		echo "Client successfully connected\n";


		/*there has to be a global event here to accept sensorID as
		payload from the sensor, set it to some variable.



		/*is there a PHP way of doing string "from S{}".format(sensorID) 
		Eeach sensorID must have its own event. So we insert the data 
		with the appropriate sensorID, while also sending it to
		the webpage of the user that is associated with this sensorID
		*/


		//Any data from sensor1 triggers 'from S1' event
		$Incoming->on('from S1', function($data)use($ServerSideSocket){
			echo "Got data\n";
			//Once triggered, we emit the event 'to C1' to the web browser
			$ServerSideSocket->emit("to C1", $data);
		});

		/*On the event 'from S1' i.e the sensor with sensorID = 1, connects to the server
		and uploads information, we should probably insert the intercepted
		data (sensor data relayed from an arduino) to the table with sensorID = 1, as well as
		send it to the user's browser*/


		// $Incoming->on('from S1', function($data){
		// 	//database operation here
		// })

		$Incoming->on('disconnect', function(){
			echo "Client disconnected\n";
		});
	});


	Worker::runAll();
?>