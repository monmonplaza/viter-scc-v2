<?php
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("returnproductid", $_GET)) {
    $productReturn->return_product_aid = $_GET['returnproductid'];
    checkId($productReturn->return_product_aid);
    $query = checkReadById($productReturn);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($productReturn);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
