<?php
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
    checkPayload($data);

    $product->product_aid = $_GET['productid'];
    $product->product_sku = checkIndex($data, "product_sku");
    $product->product_name = checkIndex($data, "product_name");
    $product->product_description = checkIndex($data, "product_description");
    $product->product_barcode = checkIndex($data, "product_barcode");

    $product->product_is_active = 1;
    $product->product_datetime = date("Y-m-d H:i:s");
    $product_name_old = strtolower($data["product_name_old"]);

    checkId($product->product_aid);

    compareName($product, $product_name_old, $product->product_name);

    $query = checkUpdate($product);
    returnSuccess($product, "product", $query);
}

checkEndpoint();
