<?php
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
    $product->product_aid = $_GET['productid'];
    checkId($product->product_aid);

    isAssociated($product);
    isAssociatedReturnProduct($product);

    $query = checkDelete($product);
    checkDeleteInventoryLog($product);
    returnSuccess($product, "product", $query);
}

checkEndpoint();
