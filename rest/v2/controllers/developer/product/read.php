<?php
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
    $product->product_aid = $_GET['productid'];
    checkId($product->product_aid);
    $query = checkReadById($product);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($product);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
