<?php

// Decode the Json info
$inData = getRequestInfo();

// Retrieve info for new contact
$FirstName = $inData["firstName"];
$LastName = $inData["lastName"];
$Phone = $inData["phone"];
$Email = $inData["email"];
$UserID = $inData["userID"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, UserID) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("ssssi", $FirstName, $LastName, $Phone, $Email, $UserID);
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
