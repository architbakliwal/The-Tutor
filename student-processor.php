<?php
include dirname( __FILE__ ).'/config.php';

$json_response = array();

$name = strip_tags( trim( $_POST["cd-name"] ) );
$mobile = strip_tags( trim( $_POST["cd-mobile"] ) );

$finalname = htmlspecialchars( $name, ENT_QUOTES, 'UTF-8' );
$finalmobile = htmlspecialchars( $mobile, ENT_QUOTES, 'UTF-8' );

$otp = mt_rand(1000, 9999);

$sqlteacher = "INSERT INTO `student`(`name`, `mobile_number`, `otp`, `is_active`, `created_time`) VALUES ('".mysql_real_escape_string( $finalname )."', '".mysql_real_escape_string( $finalmobile )."', '".mysql_real_escape_string( $otp )."', 'N', '".mysql_real_escape_string( $now )."')";


$insertteacher = mysql_query( $sqlteacher );

if ( ! $insertteacher ) {
	die( 'Could not enter data: ' . mysql_error() );
}

$sqlgetid = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'thetutor' AND TABLE_NAME = 'student'";

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

// $smsresponse = '{"Status":"Success","Details":"4404a938-3260-402a-b280-3accf476d023"}'; //TODO comment this.
$uidresponse = '{"UID":"' . $uid . '"}';

array_push($json_response, $smsresponse);
array_push($json_response, $uidresponse);

echo json_encode($json_response);

// echo '{"Status":"Success","Details":"4404a938-3260-402a-b280-3accf476d023"}';

?>
