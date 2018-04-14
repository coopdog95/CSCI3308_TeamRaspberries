<!DOCTYPE html>

<?php


	require_once 'config.php';



	if($_POST){

		$host = DB_SERVER;
		$user = DB_USERNAME;
		$pass = DB_PASSWORD;
		$db = DB_NAME;

		$username = $_POST['username'];
		$password = $_POST['password'];

		$conn = mysqli_connect($host, $user, $pass, $db);
		if($conn === false){
			echo "couldn't connect loser";
			die("ERROR: Could not connect loser." . mysqli_connect_error());
		}

		$query = "SELECT * FROM LoginInfo WHERE username='$username' and password='$password'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) == 1) {

			session_start();
			$_SESSION['LoginInfo'] = 'true';
			header("Location: index.html");

		}
		else {
				echo "wrong username or password";

		}
	}
?>


<html>
	<head>
		<title>Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style>
		body {font-family: Arial, Helvetica, sans-serif;}
		form {border: 3px solid #f1f1f1;}

		input[type=text], input[type=password] {
			width: 100%;
			padding: 12px 20px;
			margin: 8px 0;
			display: inline-block;
			border: 1px solid #ccc;
			box-sizing: border-box;
		}

		button {
			background-color: #4CAF50;
			color: white;
			padding: 14px 20px;
			margin: 8px 0;
			border: none;
			cursor: pointer;
			width: 100%;
		}

		button:hover {
			opacity: 0.8;
		}

		.cancelbtn {
			width: auto;
			padding: 10px 18px;
			background-color: #f44336;
		}

		.imgcontainer {
			text-align: center;
			margin: 24px 0 12px 0;
		}

		img.avatar {
			width: 40%;
			border-radius: 50%;
		}

		.container {
			padding: 16px;
		}

		span.psw {
			float: right;
			padding-top: 16px;
		}

		/* Change styles for span and cancel button on extra small screens */
		@media screen and (max-width: 300px) {
			span.psw {
			   display: block;
			   float: none;
			}
			.cancelbtn {
			   width: 100%;
			}
		}
		</style>
	</head>
	<body>
	  <div style="width:80%;margin-left:auto;margin-right:auto;">
		<!-- <h2 align="center" >Login Form</h2> -->

		<form name="login_form" method="POST">
		<h1 align="center">Login</h1>

		  <div class="imgcontainer">
			<img src="raspberrylogo.png" alt="Avatar" class="avatar">
		  </div>

		  <div class="container" style="width:45%;margin-left:auto;margin-right:auto;">
			<label for="username"><b>Username</b></label>
			<input type="text" placeholder="Enter Username" name="username" required>

			<label for="password"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="password" required>

			<button type="submit">Login</button>
			<label>
			  <input type="checkbox" checked="checked" name="remember"> Remember Me
			</label>
		  </div>

		  <div class="container" style="background-color:#f1f1f1">
			<p>Need an account? <a href="register.php">Sign up!</a></p>
			<!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
		  </div>
		</form>
	</div>
	</body>
</html>
