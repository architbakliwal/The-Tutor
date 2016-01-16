<?php
include dirname( __FILE__ ).'/config.php';

$json_response = array();

$type = strip_tags( trim( $_POST["searchType"] ) );
$value = strip_tags( trim( $_POST["searchVal"] ) );

$finaltype = htmlspecialchars( $type, ENT_QUOTES, 'UTF-8' );
$finalvalue = htmlspecialchars( $value, ENT_QUOTES, 'UTF-8' );

if($finaltype == "all") {
  $sqlsearch = "SELECT * FROM `teacher` WHERE MATCH(skill,stream,board,class,subject) AGAINST('" . $finalvalue . "')";
} else {
  $sqlsearch = "SELECT * FROM `teacher` WHERE MATCH(skill,stream,class) AGAINST('" . $finalvalue . "')";
}

$selectsearch = mysql_query($sqlsearch);

if ( ! $selectsearch ) {
  die('Could not select data: ' . mysql_error());
}

while ($row = mysql_fetch_array($selectsearch, MYSQL_ASSOC)) {
  $row_array['uid'] = $row['uid'];
  $row_array['name'] = $row['name'];
  $row_array['area'] = $row['area'];
  //push the values in the array
  array_push($json_response,$row_array);
}

echo json_encode($json_response);

?>
