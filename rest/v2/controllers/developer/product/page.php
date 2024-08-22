<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product/Product.php';
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $product->product_start = $_GET['start'];
        $product->product_total = 50;
        checkLimitId($product->product_start, $product->product_total);
        $query = checkReadLimit($product);
        $total_result = checkReadAll($product);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $product->product_total,
            $product->product_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
