<?php
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("returnproductid", $_GET)) {
    $productReturn->return_product_aid  = $_GET['returnproductid'];
    checkId($productReturn->return_product_aid);
    $query = checkDelete($productReturn);
    returnSuccess($productReturn, "Return Product", $query);
}

checkEndpoint();
