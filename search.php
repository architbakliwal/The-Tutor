<?php
include dirname( __FILE__ ).'/config.php';

$json_response = array();

function distance($lat1, $lon1, $lat2, $lon2, $unit) {

	$theta = $lon1 - $lon2;
	$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
	$dist = acos($dist);
	$dist = rad2deg($dist);
	$miles = $dist * 60 * 1.1515;
	$unit = strtoupper($unit);

	if ($unit == "K") {
		return ($miles * 1.609344);
	} else if ($unit == "M") {
		return ($miles * 1609.344);
	} else {
		return $miles;
	}
}

$type = strip_tags( trim( $_POST["searchType"] ) );
$value = strip_tags( trim( $_POST["searchVal"] ) );
$lat = strip_tags( trim( $_POST["latitude"] ) );
$lng = strip_tags( trim( $_POST["longitude"] ) );

$finaltype = htmlspecialchars( $type, ENT_QUOTES, 'UTF-8' );
$finalvalue = htmlspecialchars( $value, ENT_QUOTES, 'UTF-8' );
$finallat = htmlspecialchars( $lat, ENT_QUOTES, 'UTF-8' );
$finallng = htmlspecialchars( $lng, ENT_QUOTES, 'UTF-8' );

if($finaltype == "all") {
  // $sqlsearch = "SELECT * FROM `teacher` WHERE MATCH(skill,stream,board,class,subject) AGAINST('" . $finalvalue . "*' IN BOOLEAN MODE) AND is_active = 'Y'";
  $sqlsearch = "SELECT * FROM `teacher` WHERE (skill LIKE '%" . $finalvalue . " %' OR stream LIKE '%" . $finalvalue . "%' OR board LIKE '%" . $finalvalue . "%' OR class LIKE '%" . $finalvalue . "%' OR subject LIKE '%" . $finalvalue . "%') AND is_active = 'Y'";
} else {
  // $sqlsearch = "SELECT * FROM `teacher` WHERE MATCH(skill,stream,class) AGAINST('" . $finalvalue . "*' IN BOOLEAN MODE) AND is_active = 'Y'";
  $sqlsearch = "SELECT * FROM `teacher` WHERE (skill LIKE '%" . $finalvalue . "%' OR stream LIKE '%" . $finalvalue . "%' OR class LIKE '%" . $finalvalue . "%') AND is_active = 'Y'";;
}

$selectsearch = mysql_query($sqlsearch);

if ( ! $selectsearch ) {
  die('Could not select data: ' . mysql_error());
}

while ($row = mysql_fetch_array($selectsearch, MYSQL_ASSOC)) {
  $row_array['uid'] = $row['uid'];
  $row_array['name'] = $row['name'];
  $row_array['area'] = $row['area'];
  $row_array['latitude'] = $row['latitude'];
  $row_array['longitude'] = $row['longitude'];
  if(isset($finallat) && isset($finallng)) {
  	$row_array['distance'] = distance($row_array['latitude'], $row_array['longitude'], $finallat, $finallng, "M");
  }
  //push the values in the array
  array_push($json_response, $row_array);
}

if(isset($finallat) && isset($finallng)) {
	usort($json_response, function($a, $b) {
	    return $a['distance'] - $b['distance'];
	});
}

echo json_encode($json_response);

?>
