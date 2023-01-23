<?php
  include 'Util.php';
  
  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
  if( $conn->connect_error )
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("SELECT * FROM Users");
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
      returnWithInfo( $row );
    }
    else
    {
      returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
  }
?>
