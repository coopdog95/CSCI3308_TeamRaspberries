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

	//$teste=mysqli_connect("den1.mysql6.gear.host", "proj", "password.","proj") or die("Cannot connect to host"); 
	 // mysqli_select_db("proj",$teste) or die("Database does not exists."); 

	define('DB_SERVER', 'den1.mysql6.gear.host');
	define('DB_USERNAME', 'proj');
	define('DB_PASSWORD', 'password.');
	define('DB_NAME', 'proj');

	/* Attempt to connect to MySQL database */
	$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

	if($link === false){
	    die("ERROR: Could not connect loser. " . mysqli_connect_error());
	}

	$ServerSideSocket->on('connection', function($Incoming)use($ServerSideSocket, $link){
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
			// if($type == "producer"){ 			//Handle sensors
			// 	echo "LISTENERPHP: Sensor ".$ID." connected\n";
			// 	$Incoming->on('INsensor'.$ID, function($data)use($ServerSideSocket, $ID){
			// 		echo "LISTENERPHP: Got data\n";
			// 		$ServerSideSocket->emit("OUTsensor".$ID, $data); //Should put a guard here to only update when emit when this sensorID is requested
			// 	});
			// }
			if($type == "consumer"){			//Handle users
				//Check that the user has a requestedID
				if(isset($Incoming->handshake['query']['requestedSensorID'])){

					$requestedSensorID = $Incoming->handshake['query']['requestedSensorID'];
					echo "LISTENERPHP: User ".$ID." connected\n";
					echo "LISTENERPHP: User requested sensor ".$requestedSensorID."\n";
					$query = "SELECT * FROM sensorInfo";
					$result = mysqli_query($link, $query);

					while ($row = mysqli_fetch_assoc($result)) {
						echo "testDatE: ".$row['testDate']."\n";
						echo "testTime".$row['testTime']."\n";
						echo "temp".$row['temp']."\n";

						$dataVector = Array('testDate' => $row['testDate'],
											'testTime' => $row['testTime'],
											'temp' => $row['temp'],
										    'humidity' => $row['humidity']);
						$Incoming->emit("data".$ID, $dataVector);
					}
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