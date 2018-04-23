<?php

namespace phpUnitTutorial\Test;


class RegistrationValidation extends \PHPUnit_Framework_TestCase
{

	public function setUp(){
		$firstName = $lastName = $username = $password = $confirm_password = $email = "";
		$fn_err = $ln_err = $username_err = $password_err = $confirm_password_err = $email_err = "";

	}


	public function testCorrectInput()
	{

		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "someUsername";
		$testPassword = "somePassword";
		$testConfirmPassword = $testPassword;
		$testEmail = "anemail@domain.com";

		$returnedErr = $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);

		$this->assertTrue(empty($returnedErr));

	}

    public function testIncorrectEmptyUserName()
	{


		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "";
		$testPassword = "somePassword";
		$testConfirmPassword = $testPassword;
		$testEmail = "anemail@domain.com";

		$returnedErr = $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);

		$this->assertFalse(empty($returnedErr));

	}

    public function testIncorrectConfirmPass()
	{

		$testFirstName = "somefirstname";
		$testLastname = "someLastname";
		$testUsername = "someUsername";
		$testPassword = "somePassword";
		$testConfirmPassword = "notSomePassword";
		$testEmail = "anemail@domain.com";

		$returnedErr = $this->inputValidate($testFirstName, $testLastname, $testUsername, $testPassword, $testConfirmPassword,$testEmail);

		$this->assertFalse(empty($returnedErr));


	}	

    public function inputValidate($inputFirstname, $inputLastname, $inputUsername, $inputPassword, $inputConfirmPassword, $inputEmail){

	$err = "";

	//Validate first name
	if(empty(trim($inputFirstname))){
		$fn_err = "Tell us your name!";
		$err = "There is an error in for the firstname";
	}
	else{
		$firstName = trim($inputFirstname);
	}

	//Validate last name
	if(empty(trim($inputLastname))){
		$fn_err = "Tell us your last name!";
		$err = "There is an error in for the lastname";
	}
	else{
		$lastName = trim($inputLastname);
	}

    // Validate username
    if(empty(trim($inputUsername))){
        $username_err = "Please enter a username.";
		$err = "There is an error in for the username";

    }
    else{
    	$userName = $inputUsername;
    }
    // Validate password
    if(empty(trim($inputPassword))){
        $password_err = "Please enter a password.";
		$err = "There is an error in for the password";
    } elseif(strlen(trim($inputPassword)) < 6){
        $password_err = "Password must have at least 6 characters.";
		$err = "There is an error in for the password";
    } else{
        $password = trim($inputPassword);
    }

    // Validate confirm password
    if(empty(trim($inputConfirmPassword))){
        $confirm_password_err = 'Please confirm password.';
		$err = "There is an error in for the confirm password";
    } else{
        $confirm_password = trim($inputConfirmPassword);
        if($inputPassword != $inputConfirmPassword){
            $confirm_password_err = 'Password did not match.';
    		$err = "There is an error in for the confirm pass";
        }
    }

    // Validate email address
    if (empty(trim($inputEmail))) {
		$email_err = 'Please enter email';
		$err = "There is an error in for the email";

	}
	else {
		$email = trim($inputEmail);
	}

	return $err;

	}

}
