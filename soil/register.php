<?php
// Include config file
require_once('config.php');

// Define variables and initialize with empty values

function inputValidate($inputFirstname, $inputLastname, $inputUsername, $inputPassword, $inputConfirmPassword, $inputEmail){

	$errArray = array("fn_err" => "",
					  "ln_err" => "",
					  "username_err" => "",
					  "password_err" => "",
					  "confirm_password_err" => "",
					  "email_err" => "");

	$inputArray = array("firstName" => "",
					  "lastName" => "",
					  "username" => "",
					  "password" => "",
					  "email" => "");

	//Validate first name
	if(empty(trim($inputFirstname))){
		$errArray[fn_err] = "Tell us your name!";
	}
	else{
		$inputArray["firstName"] = trim($inputFirstname);
	}

	//Validate last name
	if(empty(trim($inputLastname))){
		$errArray[fn_err] = "Tell us your last name!";
	}
	else{
		$inputArray["lastName"] = trim($inputLastname);
	}

    // Validate username
    if(empty(trim($inputUsername))){
		$errArray["username_err"] = "Please enter a username.";
    }
    else{
    	$inputArray["username"] = $inputUsername;
    }
    // Validate password
    if(empty(trim($inputPassword))){
		$errArray["password_err"] = "Please enter a password.";
    } elseif(strlen(trim($inputPassword)) < 6){
		$errArray["password_err"] = "Password must have at least 6 characters.";
    } else{
        $inputArray["password"] = trim($inputPassword);
    }

    // Validate confirm password
    if(empty(trim($inputConfirmPassword))){
		$errArray["confirm_password_err"] = "Please confirm password.";
    } else{
        $confirm_password = trim($inputConfirmPassword);
        if($inputPassword != $inputConfirmPassword){
			$errArray["confirm_password_err"] = "Password did not match.";
        }
    }

    // Validate email address
    if (empty(trim($inputEmail))) {
		$errArray["email_err"] = "Please enter email.";
	}
	else {
		$inputArray["email"] = trim($inputEmail);
	}
	return array($errArray, $inputArray);

}


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
	//$err is the internal error variable, the named errors will be displayed to the user.
	$returnedValidationArray = inputValidate($_POST["firstName"], $_POST["lastName"], $_POST["username"], $_POST["password"], $_POST["confirm_password"], $_POST["email"]);

	$returnedErrArray = $returnedValidationArray[0];
	$returnedInputArray = $returnedValidationArray[1];

    // Validate username
    if(empty($returnedErrArray["username_err"])){
        // Prepare a select statement
        $sql = "SELECT userID FROM logininfo WHERE username = ?";

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
                    $returnedErrArray["username_err"] = "This username is already taken.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        else{
                echo "Oops! Something went wrong. Please try again later.";
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Checking that all the error strings are empty
    $errBoolean = True;
	foreach ($returnedErrArray as $key => $value) {
			$errBoolean = $errBoolean && empty($value);
	}

    if($errBoolean){

		$host = DB_SERVER;
		$user = DB_USERNAME;
		$pass = DB_PASSWORD;
		$db = DB_NAME;

		$conn = new mysqli($host, $user, $pass, $db);
		if($conn === false){
			echo "couldn't connect loser";
			die("ERROR: Could not connect loser." . mysqli_connect_error());
		}

		//Builing the insertion string with the user's input 
		$insertionString = $insertionString."('".$returnedInputArray["firstName"]."'," ;
		$insertionString = $insertionString."'".$returnedInputArray["lastName"]."'," ;
		$insertionString = $insertionString."'".$returnedInputArray["username"]."'," ;
		$insertionString = $insertionString."'".$returnedInputArray["password"]."'," ;
		$insertionString = $insertionString."'".$returnedInputArray["email"]."')";

		$query = "INSERT INTO logininfo (firstName, lastName, username, password, email) VALUES ".$insertionString;

		if($conn->query($query) === TRUE ) {

			//If we have a succesful registration, redirect
			if (session_status() == PHP_SESSION_NONE) {
				//Start session if there isn't one
			    session_start();
			    $_SESSION['JustRegistered'] = True;
			}
			else{
				//Don't start session
				$_SESSION['JustRegistered'] = True;
			}
			//Redirect to login
			header("Location: index.php");
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
			<div class="container" action="index.php" style="width:45%;margin-left:auto;margin-right:auto;">
						<!-- firstName -->
						<div class="form-group <?php echo (!empty($returnedErrArray["fn_err"])) ? 'has-error' : ''; ?>">
							<label><b>First Name</b></label>
							<input type="text" name="firstName"class="form-control" value="<?php echo $firstName; ?>" placeholder="Enter your first name">
							<span class="help-block"><?php echo $returnedErrArray["fn_err"]; ?></span>
						</div>

						<!-- lastName -->
						<div class="form-group <?php echo (!empty($returnedErrArray["ln_err"])) ? 'has-error' : ''; ?>">
							<label><b>Last Name</b></label>
							<input type="text" name="lastName"class="form-control" value="<?php echo $lastName; ?>" placeholder="Enter your last name">
							<span class="help-block"><?php echo $returnedErrArray["ln_err"]; ?></span>
						</div>

						<!-- username -->
						<div class="form-group <?php echo (!empty($returnedErrArray["username_err"])) ? 'has-error' : ''; ?>">
							<label><b>Username</b></label>
							<input type="text" name="username"class="form-control" value="<?php echo $username; ?>" placeholder="Enter a username">
							<span class="help-block"><?php echo $returnedErrArray["username_err"]; ?></span>
						</div>

						<!-- password -->
						<div class="form-group <?php echo (!empty($returnedErrArray["password_err"])) ? 'has-error' : ''; ?>">
							<label><b>Password</b></label>
							<input type="password" name="password" class="form-control" value="<?php echo $password; ?>" placeholder="Enter a password">
							<span class="help-block"><?php echo $returnedErrArray["password_err"]; ?></span>
						</div>

						<!-- confirm password -->
						<div class="form-group <?php echo (!empty($returnedErrArray["confirm_password_err"])) ? 'has-error' : ''; ?>">
							<label><b>Confirm Password</b></label>
							<input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>" placeholder="Please confirm your password">
							<span class="help-block"><?php echo $returnedErrArray["confirm_password_err"]; ?></span>
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
