<!DOCTYPE html>

<?php

	session_start();

	if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
		header("Location: success.php");

	}
	if (isset($_POST['username']) && isset($_POST['password'])) {
		if($_POST['username'] == $username && $_POST['password'] == $password) {

			$_SESSION['logged_in'] = true;
			header("Location: success.php");
		}
	}
?>


<html>
	<head>
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

		<form name="login_form" action="/action_page.php">
		  <div class="imgcontainer">
			<img src="raspberrylogo.png" alt="Avatar" class="avatar">
		  </div>

		  <div class="container" style="width:45%;margin-left:auto;margin-right:auto;">
			<label for="uname"><b>Username</b></label>
			<input type="text" placeholder="Enter Username" name="uname" required>

			<label for="psw"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="psw" required>

			<button type="submit">Login</button>
			<label>
			  <input type="checkbox" checked="checked" name="remember"> Remember Me
			</label>
		  </div>

		  <div class="container" style="background-color:#f1f1f1">
			<button type="button" class="cancelbtn">Cancel</button>
			<span class="psw">Forgot <a href="#">password?</a></span>
		  </div>
		</form>
	</div>
	</body>
</html>
