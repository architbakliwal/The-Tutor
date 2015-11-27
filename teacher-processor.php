<?php
include dirname( __FILE__ ).'/config.php';


$name = strip_tags( trim( $_POST["cd-name"] ) );
$skill = strip_tags( trim( $_POST["cd-skill"] ) );
$board = strip_tags( trim( $_POST["cd-board"] ) );
$stream = strip_tags( trim( $_POST["cd-stream"] ) );
$college_class = strip_tags( trim( $_POST["cd-college-class"] ) );
$subject = strip_tags( trim( $_POST["cd-subject"] ) );
$address = strip_tags( trim( $_POST["cd-address"] ) );
$area = strip_tags( trim( $_POST["cd-area"] ) );
$mobile = strip_tags( trim( $_POST["cd-mobile"] ) );
$mode = strip_tags( trim( $_POST["radio-mode"] ) );
$education = strip_tags( trim( $_POST["cd-education"] ) );
$experience = strip_tags( trim( $_POST["cd-experience"] ) );
$latitude = strip_tags( trim( $_POST["cd-latitude"] ) );
$longitude = strip_tags( trim( $_POST["cd-longitude"] ) );

$school_class = '';

if ( !empty( $_POST['school-class'] ) ) {
	foreach ( $_POST['school-class'] as $entry ) {
		$school_class = $school_class . ', ' . $entry;
	}
}


$finalname = htmlspecialchars( $name, ENT_QUOTES, 'UTF-8' );
$finalskill = htmlspecialchars( $skill, ENT_QUOTES, 'UTF-8' );
$finalboard = htmlspecialchars( $board, ENT_QUOTES, 'UTF-8' );
$finalstream = htmlspecialchars( $stream, ENT_QUOTES, 'UTF-8' );
$finalcollegeclass = htmlspecialchars( $college_class, ENT_QUOTES, 'UTF-8' );
$finalsubject = htmlspecialchars( $subject, ENT_QUOTES, 'UTF-8' );
$finaladdress = htmlspecialchars( $address, ENT_QUOTES, 'UTF-8' );
$finalarea = htmlspecialchars( $area, ENT_QUOTES, 'UTF-8' );
$finalmobile = htmlspecialchars( $mobile, ENT_QUOTES, 'UTF-8' );
$finalmode = htmlspecialchars( $mode, ENT_QUOTES, 'UTF-8' );
$finaleducation = htmlspecialchars( $education, ENT_QUOTES, 'UTF-8' );
$finalexperience = htmlspecialchars( $experience, ENT_QUOTES, 'UTF-8' );
$finallatitude = htmlspecialchars( $latitude, ENT_QUOTES, 'UTF-8' );
$finallongitude = htmlspecialchars( $longitude, ENT_QUOTES, 'UTF-8' );
$finalschoolclass = htmlspecialchars( $school_class, ENT_QUOTES, 'UTF-8' );

if($finalskill == 'school') {
	$class = $finalschoolclass;
} else {
	$class = $finalcollegeclass;
}

$otp = mt_rand(1000, 9999);

$sqlteacher = "INSERT INTO `teacher`(`name`, `skill`, `board`, `stream`, `class`, `subject`, `address`, `area`, `mobile_number`, `latitude`, `longitude`, `mode`, `qualifications`, `experience`, `otp`, `created_time`) VALUES ('".mysql_real_escape_string( $finalname )."', '".mysql_real_escape_string( $finalskill )."', '".mysql_real_escape_string( $finalboard )."', '".mysql_real_escape_string( $finalstream )."', '".mysql_real_escape_string( $class )."', '".mysql_real_escape_string( $finalsubject )."', '".mysql_real_escape_string( $finaladdress )."', '".mysql_real_escape_string( $finalarea )."', '".mysql_real_escape_string( $finalmobile )."', '".mysql_real_escape_string( $finallatitude )."', '".mysql_real_escape_string( $finallongitude )."', '".mysql_real_escape_string( $finalmode )."', '".mysql_real_escape_string( $finaleducation )."', '".mysql_real_escape_string( $finalexperience )."', '".mysql_real_escape_string( $otp )."', '".mysql_real_escape_string( $now )."')";


$insertteacher = mysql_query( $sqlteacher );

if ( ! $insertteacher ) {
	die( 'Could not enter data: ' . mysql_error() );
}

echo "P";

?>
