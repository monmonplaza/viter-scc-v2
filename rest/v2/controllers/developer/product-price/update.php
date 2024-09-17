<?php
$conn = null;
$conn = checkDbConnection();
$productPrice = new ProductPrice($conn);
$error = [];
$returnData = [];
if (array_key_exists("productpriceid", $_GET)) {
    checkPayload($data);

    $productPrice->product_price_aid = $_GET['productpriceid'];
    $productPrice->product_price_scc_price = checkIndex($data, "product_price_scc_price");
    $productPrice->product_price_scc_percent = checkIndex($data, "product_price_scc_percent");
    $productPrice->product_price_amount = checkIndex($data, "product_price_amount");
    $productPrice->product_price_percent = checkIndex($data, "product_price_percent");
    $productPrice->product_price_whole_sale_amount = checkIndex($data, "product_price_whole_sale_amount");
    $productPrice->product_price_whole_sale_percent = checkIndex($data, "product_price_whole_sale_percent");
    $productPrice->product_price_scc_whole_sale_amount = checkIndex($data, "product_price_scc_whole_sale_amount");
    $productPrice->product_price_scc_whole_sale_percent = checkIndex($data, "product_price_scc_whole_sale_percent");
    $productPrice->product_price_stock_in = checkIndex($data, "product_price_stock_in");
    $productPrice->product_price_remarks = $data["product_price_remarks"];

    // IF HAVE SALES
    $productPrice->product_price_stock_out = checkIndex($data, "product_price_stock_out");
    $productPrice->product_price_update = date("Y-m-d H:i:s");

    checkId($productPrice->product_price_aid);

    $query = checkUpdate($productPrice);
    returnSuccess($productPrice, "product price", $query);
}

checkEndpoint();
