<?php

// Decode the Json info
$inData = getRequestInfo();

// Get values of updated contact info
$ID = $inData["id"];
$FirstName = $inData["firstName"];
$LastName = $inData["lastName"];
$Phone = $inData["phone"];
$Email = $inData["email"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
    $stmt->bind_param("ssssi", $FirstName, $LastName, $Phone, $Email, $ID);
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
