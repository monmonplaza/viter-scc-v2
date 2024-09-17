<?php
$conn = null;
$conn = checkDbConnection();
$productPrice = new ProductPrice($conn);
$error = [];
$returnData = [];
if (array_key_exists("productpriceid", $_GET)) {

    $productPrice->product_price_aid = $_GET['productpriceid'];
    checkId($productPrice->product_price_aid);
    $query = checkReadById($productPrice);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($productPrice);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
