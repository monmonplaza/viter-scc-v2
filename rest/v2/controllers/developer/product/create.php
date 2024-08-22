<?php
$conn = null;
$conn = checkDbConnection();

$product = new Product($conn);

if (array_key_exists("productid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$product->product_sku = checkIndex($data, "product_sku");
$product->product_name = checkIndex($data, "product_name");
$product->product_description = checkIndex($data, "product_description");
$product->product_barcode = checkIndex($data, "product_barcode");

$product->product_is_active = 1;
$product->product_created = date("Y-m-d H:i:s");
$product->product_datetime = date("Y-m-d H:i:s");


isNameExist($product, $product->product_name);

$query = checkCreate($product);
returnSuccess($product, "product", $query);
