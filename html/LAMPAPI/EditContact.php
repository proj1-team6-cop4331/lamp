<?php

// Decode the Json info
$inData = getRequestInfo();

// Get values of updated contact info
$ID = $inData["id"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["mail"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("UPDATE Contacts SET firstName=?, lastName=?, phone=?, email=? WHERE ID=?");
    $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $ID);
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
