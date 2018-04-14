<?php
	
	require_once 'vendor/autoload.php';

	use Workerman\Worker;
	use PHPSocketIO\SocketIO;



	//This successfully accepts data from some client
	//then sends it to a user with home.php open.
	//So the data can now go like this:
	//(arduino -> server -> client) 
	//all real time.
	$ServerSideSocket = new SocketIO(3006);

	$ServerSideSocket->on('connection', function($Incoming)use($ServerSideSocket){
		echo "Client successfully connected\n";

		$Incoming->on('from S1', function($data)use($ServerSideSocket){
			echo "Got data\n";;
			$ServerSideSocket->emit("to C1", $data);
		});

		$Incoming->on('disconnect', function(){
			echo "Client disconnected\n";
		});
	});


	Worker::runAll();
?>