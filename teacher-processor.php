<?php
include dirname( __FILE__ ).'/config.php';

$json_response = array();


$name = strip_tags( trim( $_POST["cd-name"] ) );
// $skill = strip_tags( trim( $_POST["cd-skill"] ) );
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

$skill = '';

if ( !empty( $_POST['cd-skill'] ) ) {
  foreach ( $_POST['cd-skill'] as $entry ) {
    $skill = $skill . ', ' . $entry;
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

/*if($finalskill == 'school') {
	$class = $finalschoolclass
} else {
	$class = $finalcollegeclass;
}*/

$class = $finalschoolclass . "," . $finalcollegeclass;

$otp = mt_rand(1000, 9999);

$sqlteacher = "INSERT INTO `teacher`(`name`, `skill`, `board`, `stream`, `class`, `subject`, `address`, `area`, `mobile_number`, `latitude`, `longitude`, `mode`, `qualifications`, `experience`, `otp`, `is_active`, `created_time`) VALUES ('".mysql_real_escape_string( $finalname )."', '".mysql_real_escape_string( $finalskill )."', '".mysql_real_escape_string( $finalboard )."', '".mysql_real_escape_string( $finalstream )."', '".mysql_real_escape_string( $class )."', '".mysql_real_escape_string( $finalsubject )."', '".mysql_real_escape_string( $finaladdress )."', '".mysql_real_escape_string( $finalarea )."', '".mysql_real_escape_string( $finalmobile )."', '".mysql_real_escape_string( $finallatitude )."', '".mysql_real_escape_string( $finallongitude )."', '".mysql_real_escape_string( $finalmode )."', '".mysql_real_escape_string( $finaleducation )."', '".mysql_real_escape_string( $finalexperience )."', '".mysql_real_escape_string( $otp )."', 'N', '".mysql_real_escape_string( $now )."')";


$insertteacher = mysql_query( $sqlteacher );

if ( ! $insertteacher ) {
	die( 'Could not enter data: ' . mysql_error() );
}

$sqlgetid = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'thetutor' AND TABLE_NAME = 'teacher'";

$selectid = mysql_query( $sqlgetid );

if ( ! $selectid ) {
	die( 'Could not select UID: ' . mysql_error() );
}

while ($row = mysql_fetch_array($selectid, MYSQL_ASSOC)) {
	$uid = $row['AUTO_INCREMENT'];
}


// echo "P";

$smsresponse = "{}";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://2factor.in/API/V1/235a33f9-9a6b-11e5-9a14-00163ef91450/SMS/" . $finalmobile . "/" . $otp,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  $smsresponse = '{"Status":"' . $err . '"}';
} else {
  $smsresponse = $response;
}

// $smsresponse = '{"Status":"Success","Details":"4404a938-3260-402a-b280-3accf476d023"}';
$uidresponse = '{"UID":"' . $uid . '"}';

array_push($json_response, $smsresponse);
array_push($json_response, $uidresponse);

echo json_encode($json_response);

// echo '{"Status":"Success","Details":"4404a938-3260-402a-b280-3accf476d023"}';

?>
