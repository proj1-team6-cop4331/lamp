<?php

// Decode the Json info
$inData = getRequestInfo();

// Retrieve info for delete contact
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$userID = $inData["userID"];

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("DELETE FROM Contacts firstName=? AND lastName=? AND userId=?");
    $stmt->bind_param("ssi", $firstName, $lastName, $userID);
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
