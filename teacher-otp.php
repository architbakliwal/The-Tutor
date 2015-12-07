<?php
include dirname( __FILE__ ).'/config.php';

$dbotp = 0;

$otp = strip_tags( trim( $_POST["cd-otp"] ) );
$uid = strip_tags( trim( $_POST["cd-uid"] ) );


$finalotp = htmlspecialchars( $otp, ENT_QUOTES, 'UTF-8' );
$finaluid = htmlspecialchars( $uid, ENT_QUOTES, 'UTF-8' );


$sqlotp = "SELECT `otp` FROM `teacher` WHERE `uid` = " . $finaluid;

$selectotp = mysql_query( $sqlotp );

if ( ! $selectotp ) {
  die( 'Could not select OTP: ' . mysql_error() );
}

while ($row = mysql_fetch_array($selectotp, MYSQL_ASSOC)) {
  $dbotp = $row['otp'];
}

if($dbotp == $finalotp) {
  $sqlisactive = "UPDATE `teacher` SET `is_active` ='Y' WHERE `uid` = " . $finaluid;

  $updateisactive = mysql_query( $sqlisactive );

  if ( ! $updateisactive ) {
    die( 'Could not update is_active: ' . mysql_error() );
  }

  echo "P";
} else {
  echo "F";
}


?>
