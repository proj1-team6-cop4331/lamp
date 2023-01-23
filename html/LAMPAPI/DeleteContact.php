<?php

// Decode the Json info
$inData = getRequestInfo();

// Retrieve info for delete contact
$FirstName = $inData["firstName"];
$LastName = $inData["lastName"];
$UserID = $inData["userID"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("DELETE FROM Contacts FirstName=? AND LastName=? AND UserId=?");
    $stmt->bind_param("ssi", $FirstName, $LastName, $UserID);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
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
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}
