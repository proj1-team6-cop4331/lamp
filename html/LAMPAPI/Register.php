<?php
include 'Util.php';

$inData = getRequestInfo();

//get user info
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$login = $inData["login"];
$password = $inData["password"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if( $conn->connect_error )
{
  returnWithError( $conn->connect_error );
}
else
{
  //prepare and bind
  $stmt = $conn->prepare("SELECT * FROM Users WHERE Login = ?");
  $stmt->bind_param("s", $login);
  $stmt->execute();
  $result = $stmt->get_result();

  //if no one else has the same login or username, create new
  if(mysqli_num_rows($result) == 0){
    $stmt = $conn->prepare("INSERT into Users (firstName, lastName, login, password) Values (?,?,?,?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
    $stmt->execute();

    //returns value generated for an auto_increment column or id column
    $id = $conn->insert_id;
    
    $stmt->close();
    $conn->close();

    //return info
    returnSearchInfo('{'.'"id": "'.$id.''.'"}');

    
  } else {
    //username doesnt exist
    returnWithError("Taken Username");
  }
}
?>
