<?php
include dirname( __FILE__ ).'/config.php';

$json_response = array();

$uid = strip_tags( trim( $_POST["uid"] ) );

$finaluid = htmlspecialchars( $uid, ENT_QUOTES, 'UTF-8' );

$sqlsearch = "SELECT * FROM `teacher` WHERE `uid` = " . $finaluid;

$selectsearch = mysql_query($sqlsearch);

if ( ! $selectsearch ) {
  die('Could not select data: ' . mysql_error());
}

while ($row = mysql_fetch_array($selectsearch, MYSQL_ASSOC)) {
  //push the values in the array
  array_push($json_response,$row);
}

echo json_encode($json_response);

?>
