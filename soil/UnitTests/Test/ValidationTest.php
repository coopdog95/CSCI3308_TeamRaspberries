<?php

namespace phpUnitTutorial\Test;


class RegistrationValidation extends \PHPUnit_Framework_TestCase
{

	public function setUp(){
		$firstName = $lastName = $username = $password = $confirm_password = $email = "";
	}


	public function testCorrectInput()
	{

		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "someUsername";
		$testPassword = "somePassword";
		$testConfirmPassword = $testPassword;
		$testEmail = "anemail@domain.com";

		$returnedValidationArray= $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);
		$returnedErrArray = $returnedValidationArray[0];


		//Confirm empty for each error string
		$errBoolean = true;
		foreach ($returnedErrArray as $key => $value) {
			$errBoolean = $errBoolean && empty($value);
		}

		$this->assertTrue($errBoolean);

	}

    public function testIncorrectEmptyUserName()
	{


		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "";
		$testPassword = "somePassword";
		$testConfirmPassword = $testPassword;
		$testEmail = "anemail@domain.com";

		$returnedValidationArray= $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);
		$returnedErrArray = $returnedValidationArray[0];

		$this->assertFalse(empty($returnedErrArray["username_err"]));

	}

    public function testIncorrectConfirmPass()
	{

		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "someUsername";
		$testPassword = "somePassword";
		$testConfirmPassword = "notSomePassword";
		$testEmail = "anemail@domain.com";

		$returnedValidationArray= $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);
		$returnedErrArray = $returnedValidationArray[0];
		
		$this->assertFalse(empty($returnedErrArray["confirm_password_err"]));


	}	

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


}
