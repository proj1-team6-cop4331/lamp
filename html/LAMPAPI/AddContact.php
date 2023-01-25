<?php

// Decode the Json info
$inData = getRequestInfo();

// Retrieve info for new contact
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["email"];
$userID = $inData["userID"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Doing work
    $stmt = $conn->prepare("INSERT into Contacts (firstName, lastName, phone, email, userID) VALUES(?,?,?,?,?)");
    $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userID);
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
