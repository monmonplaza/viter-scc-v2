<?php
$conn = null;
$conn = checkDbConnection();

$product = new Product($conn);

if (array_key_exists("productid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$product->product_name = checkIndex($data, "product_name");
$product->product_description = checkIndex($data, "product_description");
$product->product_category_id = checkIndex($data, "product_category_id");
$product->product_is_active = 1;
$product->product_created = date("Y-m-d H:i:s");
$product->product_datetime = date("Y-m-d H:i:s");

$product->product_sku = rand(1000000, 9999999);

$is_generate_barcode = checkIndex($data, "is_generate_barcode");
if ($is_generate_barcode == true) {
    $product->product_barcode = substr(intval($product->product_category_id) . date("m") . date("d") . date("H") . date("i") . date("s") .  rand(1000, 9999), 0, 12);
} else {
    $product->product_barcode = "";
}

isNameExist($product, $product->product_name);

$query = checkCreate($product);
checkCreateInventoryLog($product);
checkUpdateProductSKUByLastInsertedId($product);
returnSuccess($product, "product", $query);
