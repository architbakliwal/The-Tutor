<?php

/*	--------------------------------------------------
	:: CONFIG SETTINGS
	-------------------------------------------------- */

	if($_SERVER['SERVER_ADDR'] == '127.0.0.1') {
		$hostname_Connection = "127.0.0.1";
	    $database_Connection = "thetutor";
	    $username_Connection = "root";
	    $password_Connection = "";
	    $baseurl = 'http://127.0.0.1/thetutor/';
	} else {
		$hostname_Connection = "localhost";
	    $database_Connection = "thetutor";
	    $username_Connection = "thetutor";
	    $password_Connection = "thetutor";
	    $baseurl = 'http://thetutor.in/';
	}

	error_reporting(0);

	// error_reporting(E_ALL & ~E_NOTICE);
	
	// Enter your default time zone
	date_default_timezone_set('Asia/Kolkata');
	
	$now = date("Y-m-d H:i:s");
	
	// Enter Next Year here!
	$year = date("Y");

	$connection = mysql_connect($hostname_Connection, $username_Connection, $password_Connection) or die ('<div class="error-message"><i class="icon-close"></i>Failed to connect to MySQL '.mysql_error().'</div>');
    $database = mysql_select_db ($database_Connection, $connection) or die ('<div class="error-message"><i class="icon-close"></i>Failed to connect to MySQL '.mysql_error().'</div>');

?>