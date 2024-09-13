<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/return-product/ReturnProduct.php';
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $productReturn->return_product_start = $_GET['start'];
        $productReturn->return_product_total = 50;
        checkLimitId($productReturn->return_product_start, $productReturn->return_product_total);
        $query = checkReadLimit($productReturn);
        $total_result = checkReadAll($productReturn);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $productReturn->return_product_total,
            $productReturn->return_product_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
