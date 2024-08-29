<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/defective-product/DefectiveProduct.php';

$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("defectiveproductid", $_GET)) {

        checkPayload($data);
        $defectiveProduct->defective_product_aid = $_GET['defectiveproductid'];
        $defectiveProduct->defective_product_is_resolve = trim($data["isActive"]);
        $defectiveProduct->defective_product_datetime = date("Y-m-d H:i:s");

        checkId($defectiveProduct->defective_product_aid);
        $query = checkActive($defectiveProduct);
        http_response_code(200);
        returnSuccess($defectiveProduct, "defectiveProduct", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
