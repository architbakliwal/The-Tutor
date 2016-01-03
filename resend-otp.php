<?php
include dirname( __FILE__ ).'/config.php';


$uid = strip_tags( trim( $_POST["uid"] ) );

$finaluid = htmlspecialchars( $uid, ENT_QUOTES, 'UTF-8' );

$sqlmobile = "SELECT `mobile_number` FROM `teacher` WHERE `uid` = '$finaluid'";

$selectmobile = mysql_query( $sqlmobile );

if ( ! $selectmobile ) {
  die( 'Could not select Mobile Number: ' . mysql_error() );
}

while ($row = mysql_fetch_array($selectmobile, MYSQL_ASSOC)) {
  $finalmobile = $row['mobile_number'];
}

$otp = mt_rand(1000, 9999);

$sqlotp = "UPDATE `teacher` SET `otp` = '$otp' WHERE `uid` = '$finaluid'";

$updateotp = mysql_query( $sqlotp );

if ( ! $updateotp ) {
	die( 'Could not update OTP: ' . mysql_error() );
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

echo json_encode($smsresponse);

?>
