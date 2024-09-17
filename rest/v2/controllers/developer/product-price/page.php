<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product-price/ProductPrice.php';

$conn = null;
$conn = checkDbConnection();
$productPrice = new ProductPrice($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $productPrice->product_price_start = $_GET['start'];
        $productPrice->product_price_total = 50;
        checkLimitId($productPrice->product_price_start, $productPrice->product_price_total);
        $query = checkReadLimit($productPrice);
        $total_result = checkReadAll($productPrice);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $productPrice->product_price_total,
            $productPrice->product_price_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
