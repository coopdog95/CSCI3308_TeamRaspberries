<?php

	session_start();
	if(!$_SESSION['LoginInfo'])
	{
		header("Location: login.php");
	}

?>

<h1> You have been authenticated! </h1>
