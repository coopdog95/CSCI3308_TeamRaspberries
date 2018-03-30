<!doctype html>
<?php

	session_start();

	if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false) {
		header("Location: index.php");
	}


?>

<html>
	
<h2> You have logged in!</h2>
</html>