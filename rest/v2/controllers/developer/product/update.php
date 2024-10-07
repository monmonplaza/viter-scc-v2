<?php
$conn = null;
$conn = checkDbConnection();
$product = new Product($conn);
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
    checkPayload($data);

    $product->product_aid = $_GET['productid'];
    $product->product_name = checkIndex($data, "product_name");
    $product->product_description = checkIndex($data, "product_description");
    $product->product_category_id = checkIndex($data, "product_category_id");

    $product->product_datetime = date("Y-m-d H:i:s");
    $product_name_old = strtolower($data["product_name_old"]);

    $is_generate_barcode = checkIndex($data, "is_generate_barcode");
    if ($is_generate_barcode == true) {
        $product->product_barcode = substr(intval($product->product_category_id) . date("m") . date("d") . date("H") . date("i") . date("s") .  rand(1000, 9999), 0, 12);
    } else {
        $product->product_barcode = "";
    }

    checkId($product->product_aid);

    compareName($product, $product_name_old, $product->product_name);

    $query = checkUpdate($product);
    returnSuccess($product, "product", $query);
}

checkEndpoint();
