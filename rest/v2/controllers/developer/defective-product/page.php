<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/defective-product/DefectiveProduct.php';
$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $defectiveProduct->defective_product_start = $_GET['start'];
        $defectiveProduct->defective_product_total = 50;
        checkLimitId($defectiveProduct->defective_product_start, $defectiveProduct->defective_product_total);
        $query = checkReadLimit($defectiveProduct);
        $total_result = checkReadAll($defectiveProduct);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $defectiveProduct->defective_product_total,
            $defectiveProduct->defective_product_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
