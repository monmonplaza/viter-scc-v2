<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/product/Product.php';
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $query = checkReadAllCategory($product);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
