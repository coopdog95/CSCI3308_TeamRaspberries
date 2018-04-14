<?php
	
	require_once 'vendor/autoload.php';

	use Workerman\Worker;
	use PHPSocketIO\SocketIO;

	// listen port 3001 for socket.io client
	$io = new SocketIO(3001);
	$io->on('connection', function($socket)use($io){
		echo 'successful connection';

		$socket->on('disconnect', function(){
			echo 'client disconnected';
		});
	});

	Worker::runAll();
?>