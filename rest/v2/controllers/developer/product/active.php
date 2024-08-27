<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product/Product.php';
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("productid", $_GET)) {

        checkPayload($data);
        $product->product_aid = $_GET['productid'];
        $product->product_is_active = trim($data["isActive"]);
        $product->product_datetime = date("Y-m-d H:i:s");

        checkId($product->product_aid);
        $query = checkActive($product);
        http_response_code(200);
        returnSuccess($product, "product", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
