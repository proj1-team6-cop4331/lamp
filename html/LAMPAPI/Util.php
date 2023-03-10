<?php
function getRequestInfo()
{
  return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
  header('Content-type: application/json');
  echo $obj;
}

function returnWithError( $err )
{
  $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $id )
{
  $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

function returnSearchInfo( $searchResults ){
	$retValue = '{"results":[' . $searchResults . '],"error":""}';
	sendResultInfoAsJson( $retValue );
}

function returnSearchError( $info ){
	$retValue = '{"Error": "' . $info . '"}';
	sendResultInfoAsJson( $retValue );
}
?>