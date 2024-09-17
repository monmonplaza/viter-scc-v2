<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product-price/ProductPrice.php';

$conn = null;
$conn = checkDbConnection();

$productPrice = new ProductPrice($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $productPrice->product_price_search = $data["searchValue"];    // get data

    checkKeyword($productPrice->product_price_search);
    $query = checkSearch($productPrice);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
