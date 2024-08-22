<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product/Product.php';

$conn = null;
$conn = checkDbConnection();

$product = new Product($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);

    $product->product_search = $data["searchValue"];
    checkKeyword($product->product_search);
    $query = checkSearch($product);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
