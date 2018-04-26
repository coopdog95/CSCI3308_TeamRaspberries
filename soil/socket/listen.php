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
		echo "LISTENERPHP: CONNECTION\n";

		foreach ($Incoming->handshake as $key => $value) {
				echo "LISTENERPHP: ( Key: ".$key.") | (value: ".$value.") \n";
		}

		//Check incoming payload set properly
		if(isset($Incoming->handshake['query']['type']) && isset($Incoming->handshake['query']['ID'])){
			$type = $Incoming->handshake['query']['type'];
			$ID = $Incoming->handshake['query']['ID'];
			echo "LISTENERPHP: TYPE = ".$type."| ID: ".$ID." \n";

			//Should pull the data from Mysql, if it's too slow, I'll switch to this
			//Check that the type of incoming connection is provided
			if($type == "producer"){ 			//Handle sensors
				echo "LISTENERPHP: Sensor ".$ID." connected\n";
				$Incoming->on('INsensor'.$ID, function($data)use($ServerSideSocket, $ID){
					echo "LISTENERPHP: Got data\n";
					$ServerSideSocket->emit("OUTsensor".$ID, $data); //Should put a guard here to only update when emit when this sensorID is requested
				});
			}
			elseif($type == "consumer"){			//Handle users
				//Check that the user has a requestedID
				if(isset($Incoming->handshake['query']['requestedSensorID'])){
					$requestedSensorID = $Incoming->handshake['query']['requestedSensorID'];
					echo "LISTENERPHP: User ".$ID." connected\n";
					echo "LISTENERPHP: User requested sensor ".$requestedSensorID."\n";
				}
				else{
					echo "LISTENERPHP: User payload requestedSensorID error";
				}
			}
			else{
				echo "LISTENERPHP: Unknown type of connection, disconnecting socket..";
			    $Incoming->disconnect(true);
			}


			$Incoming->on('end', function (){
			    $Incoming->disconnect(true);
			});


			$Incoming->on('disconnect', function(){
				echo "LISTENERPHP: Client disconnected\n";
			});
		}
		else{
			echo "LISTENERPHP: failed to receive handshake payload\n, disconnecting socket..";
		    $Incoming->disconnect(true);
		}
	});



	Worker::runAll();
?>