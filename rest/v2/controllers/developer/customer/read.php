<?php
$conn = null;
$conn = checkDbConnection();
$customer = new Customer($conn);
$error = [];
$returnData = [];
if (array_key_exists("customerid", $_GET)) {
    $customer->customer_aid = $_GET['customerid'];
    checkId($customer->customer_aid);
    $query = checkReadById($customer);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($customer);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
