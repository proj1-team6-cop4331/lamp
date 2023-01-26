<?php

// Decode the Json info
$inData = getRequestInfo();

// Declare variables that will be returned
$searchResults = "";
$searchCount = 0;

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Query that selects all contacts that have similar spelling from what's being searched
    // Takes into account both first and last name
    $stmt = $conn->prepare("SELECT * from Contacts WHERE (firstName LIKE ? OR lastName LIKE ? )AND userID=?");
    $subName = "%" . $inData["search"] . "%";
    $stmt->bind_param("sss", $subName, $subName, $inData["userId"]);
    $stmt->execute();
    $result = $stmt->get_result();

    //Fetching all the rows as arrays
    while ($row = $result->fetch_assoc()) {
        if ($searchCount > 0) {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '{"firstName" : "' . $row["firstName"] . '", "lastName" : "' . $row["lastName"] . '", "phone" : "' . $row["phone"] . '", "email" : "' . $row["email"] . '", "userID" : "' . $row["userID"] . '", "ID" : "' . $row["ID"] . '"}';
    }

    if ($searchCount == 0) {
        returnWithError("No Records Found");
    } else {
        returnWithInfo($searchResults);
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($searchResults)
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson($retValue);
}
