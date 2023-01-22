<?php
include 'Util.php';

$inData = getRequestInfo();
$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
if( $conn->connect_error )
{
  returnWithError( $conn->connect_error );
} else {
  $stmt = $conn->prepare("SELECT * FROM Users Where Login = ?");
  $stmt->bind_param("s", $iinData["login"]);
  $stmt->execute();

  $result = $stmt->get_result();

  while($row = $result->fetch_assoc()){
    $searchCount++;
  }
  if($searchCount == 0){
    returnSearchError("");
  } else {
    returnWithError("Username has been taken");
  }

  $stmt->close();
  $conn->close();
}
?>