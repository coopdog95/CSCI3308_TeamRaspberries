<!DOCTYPE html>

<?php


	require_once 'config.php';

	session_start();

	if($_POST){

		// $host = DB_SERVER;
		// $user = DB_USERNAME;
		// $pass = DB_PASSWORD;
		// $db = DB_NAME;

		$username = $_POST['username'];
		$password = $_POST['password'];

		// $conn = mysqli_connect($host, $user, $pass, $db);

		// if($conn === false){
		// 	echo "couldn't connect loser";
		// 	die("ERROR: Could not connect loser." . mysqli_connect_error());
		// }

		$query = "SELECT * FROM logininfo WHERE username='$username' and password='$password'";
		$result = mysqli_query($link, $query);
		if (mysqli_num_rows($result) == 1) {

			$row = mysqli_fetch_assoc($result);


			//_SESSION stores key-value pairs across different webpages 
			$_SESSION['logininfo'] = 'true';
			$_SESSION['username'] = $username;
			$_SESSION['firstName'] = $row['firstName'];
			$_SESSION['lastName'] = $row['lastName'];
			$_SESSION['userID'] = $row['userID'];

			// Where is this suppose to point to?
			header("Location: home.php");

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
		<!-- Bootstrap core CSS -->
    	<link href="/javascript/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<style>
		body {font-family: Arial, Helvetica, sans-serif; margin: 6%;overflow: hidden;}
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
		<!-- Navigation -->
	    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	      <div class="container">
	        <a class="navbar-brand" href="#">User Profile</a>
	        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="navbar-toggler-icon"></span>
	        </button>
	        <div class="collapse navbar-collapse" id="navbarResponsive">
	          <ul class="navbar-nav ml-auto">
	            <li class="nav-item">
	              <a class="nav-link" href="home.php">Home
	                <span class="sr-only">(current)</span>
	              </a>
	            </li>
	            <li class="nav-item">
	              <a class="nav-link" href="map.php">Map</a>
	            </li>
	            <li class="nav-item active">
	              <a class="nav-link" href="index.php">User</a>
	            </li>
	            </li>
	          </ul>
	        </div>
	      </div>
	    </nav>
	  <div style="width:80%;margin-left:auto;margin-right:auto;">
		<!-- <h2 align="center" >Login Form</h2> -->


		<?php	if(isset($_SESSION['JustRegistered']) && ($_SESSION['JustRegistered'] == True)){ ?>
		<label style="width:45%;margin-left:auto;margin-right:auto;"> Registration Successful </label>
		<?php 		$_SESSION['JustRegistered'] = False;}?>	


		<form name="login_form" method="POST">
		<h1 align="center">Login</h1>

		  <div class="imgcontainer">
			<img src="/resources/raspberrylogo.png" alt="Avatar" class="avatar">
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

		<button onclick="window.location.href = '/home.php';">Demo User Page</button>
	</div>
	</body>
</html>
