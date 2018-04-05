<!doctype html>
<?php

	session_start();
	if(!$_SESSION['LoginInfo'])
	{
		header("Location: login.php");
	}

?>

<<<<<<< HEAD
<html>
	
<h2> You have logged in!</h2>
</html>
=======
<h1> You have been authenticated! </h1>
>>>>>>> 97391c23e696c7aa04182aa3964a25456a6c40af
