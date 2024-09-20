<?php
$conn = null;
$conn = checkDbConnection();
$purchase = new Purchase($conn);
$error = [];
$returnData = [];
if (array_key_exists("purchaseid", $_GET)) {
    $purchase->purchase_aid = $_GET['purchaseid'];
    checkId($purchase->purchase_aid);
    $query = checkReadById($purchase);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($purchase);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
