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
    $stmt->execute();
    $result = $stmt->get_result();

    // Get ID by new SQL Statement 
    $getIDStatement = $conn->prepare("SELECT ID FROM Contacts WHERE (firstName=? AND lastName=? AND phone=? AND email=? AND userID=?)");
    $getIDStatement->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userID);
    $getIDStatement->execute();
    $getIDResult = $getIDStatement->get_result()->fetch_assoc();

    $finalRes .= '{"ID" : "' . $getIDResult["ID"] . '"}';

    $stmt->close();
    $getIDStatement->close();
    $conn->close();

    returnWithInfo($finalRes);
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

function returnWithInfo($finalRes)
{
    $retValue = '{"results":[' . $finalRes . '],"error":""}';
    sendResultInfoAsJson($retValue);
}
