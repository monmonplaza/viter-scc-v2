<?php
$conn = null;
$conn = checkDbConnection();
$sales = new Sales($conn);
$error = [];
$returnData = [];
if (array_key_exists("salesid", $_GET)) {
    $sales->sales_aid = $_GET['salesid'];
    checkId($sales->sales_aid);
    $query = checkReadById($sales);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($sales);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
