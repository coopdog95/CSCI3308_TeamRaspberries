<?php
// Include config file
require('config.php');

// Define variables and initialize with empty values
$firstName = $lastName = $username = $password = $confirm_password = $email = "";
$fn_err = $ln_err = $username_err = $password_err = $confirm_password_err = $email_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

	//Validate first name
	if(empty(trim($_POST["firstName"]))){
		$fn_err = "Tell us your name!";
	}
	else{
		$firstName = trim($_POST["firstName"]);
	}

	//Validate last name
	if(empty(trim($_POST["lastName"]))){
		$fn_err = "Tell us your last name!";
	}
	else{
		$lastName = trim($_POST["lastName"]);
	}

    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT userID FROM LoginInfo WHERE username = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
	            $username_err = "Some username related error 1.";
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        else{
            $username_err = "Some username related error 2.";
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate password
    if(empty(trim($_POST['password']))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST['password'])) < 6){
        $password_err = "Password must have at least 6 characters.";
    } else{
        $password = trim($_POST['password']);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = 'Please confirm password.';
    } else{
        $confirm_password = trim($_POST['confirm_password']);
        if($password != $confirm_password){
            $confirm_password_err = 'Password did not match.';
        }
    }

    // Validate email address
    if (empty(trim($_POST["email"]))) {
		$email_err = 'Please enter email';

	}
	else {
		$email = trim($_POST['email']);
	}


    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){

		$host = DB_SERVER;
		$user = DB_USERNAME;
		$pass = DB_PASSWORD;
		$db = DB_NAME;

		$conn = new mysqli($host, $user, $pass, $db);
		if($conn === false){
			echo "couldn't connect loser";
			die("ERROR: Could not connect loser." . mysqli_connect_error());
		}

		$query = "INSERT INTO LoginInfo (firstName, lastName, username, password, email) VALUES ('$firstName', '$lastName', '$username', '$password', '$email')";
		if($conn->query($query) === TRUE ) {
			echo "You have successfully registered!";
		}
		else {
			echo "Error: " . $query . "<br>" . $conn->error;

		}
		$conn->close();


    }
}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Registration</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style>
		body {font-family: Arial, Helvetica, sans-serif;}
		form {border: 3px solid #f1f1f1;}

		input {
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
		<div style="width:75%;margin-left:auto;margin-right:auto;">
			<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

			<h1 align="center">Registration</h1>

			<div class="imgcontainer">
				<img src="resources/raspberrylogo.png" alt="Avatar" class="avatar">
			</div>
			<div class="container" action="/index.php" style="width:45%;margin-left:auto;margin-right:auto;">
						<!-- firstName -->
						<div class="form-group <?php echo (!empty($fn_err)) ? 'has-error' : ''; ?>">
							<label><b>First Name</b></label>
							<input type="text" name="firstName"class="form-control" value="<?php echo $firstName; ?>" placeholder="Enter your first name">
							<span class="help-block"><?php echo $fn_err; ?></span>
						</div>

						<!-- lastName -->
						<div class="form-group <?php echo (!empty($ln_err)) ? 'has-error' : ''; ?>">
							<label><b>Last Name</b></label>
							<input type="text" name="lastName"class="form-control" value="<?php echo $lastName; ?>" placeholder="Enter your last name">
							<span class="help-block"><?php echo $ln_err; ?></span>
						</div>

						<!-- username -->
						<div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
							<label><b>Username</b></label>
							<input type="text" name="username"class="form-control" value="<?php echo $username; ?>" placeholder="Enter a username">
							<span class="help-block"><?php echo $username_err; ?></span>
						</div>

						<!-- password -->
						<div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
							<label><b>Password</b></label>
							<input type="password" name="password" class="form-control" value="<?php echo $password; ?>" placeholder="Enter a password">
							<span class="help-block"><?php echo $password_err; ?></span>
						</div>

						<!-- confirm password -->
						<div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
							<label><b>Confirm Password</b></label>
							<input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>" placeholder="Please confirm your password">
							<span class="help-block"><?php echo $confirm_password_err; ?></span>
						</div>

						<label for="email"><b>Email</b></label>
						<input type="email" placeholder="Enter email address" name="email" required>
						<button type="submit">Sign up!</button>


					</form>
			</div>
			<div class="container" style="background-color:#f1f1f1">
							<p>Already have an account? <a href="index.php">Sign in.</a></p>
							<!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
						</div>

		</div>
	</body>
</html>
