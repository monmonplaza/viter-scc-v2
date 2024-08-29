<?php
$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("defectiveproductid", $_GET)) {
    $defectiveProduct->defective_product_aid = $_GET['defectiveProductid'];
    checkId($defectiveProduct->defective_product_aid);
    $query = checkReadById($defectiveProduct);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($defectiveProduct);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
