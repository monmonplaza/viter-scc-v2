<?php
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingid", $_GET)) {
    $receiving->receiving_aid = $_GET['receivingid'];
    checkId($receiving->receiving_aid);
    $query = checkReadById($receiving);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($receiving);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
