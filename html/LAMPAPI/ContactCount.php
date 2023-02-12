<?php

// Change for project but connecting to Database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Test Connection and do work 
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Query that selects all contacts that have similar spelling from what's being searched
    // Takes into account both first and last name
    $stmt = $conn->prepare("SELECT COUNT(*) FROM Contacts WHERE userID=?");
    $stmt->bind_param("i", $inData["userId"]);
    $stmt->execute();
    $result = $stmt->get_result();

    // Get the count as json
    $searchResults = '{"Count" : "' . $result . '""}';

    returnWithInfo($searchResults);

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
