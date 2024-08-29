<?php
$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("defectiveproductid", $_GET)) {
    $defectiveProduct->defective_product_aid = $_GET['defectiveProductid'];
    checkId($defectiveProduct->defective_product_aid);
    // isAssociated($defectiveProduct);
    $query = checkDelete($defectiveProduct);
    returnSuccess($defectiveProduct, "defectiveProduct", $query);
}

checkEndpoint();
