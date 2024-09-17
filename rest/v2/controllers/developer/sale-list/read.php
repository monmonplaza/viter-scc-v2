<?php
$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$error = [];
$returnData = [];
if (array_key_exists("saleslistid", $_GET)) {
    $salesList->sales_list_aid = $_GET['saleslistid'];
    checkId($salesList->sales_list_aid);
    $query = checkReadById($salesList);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($salesList);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
