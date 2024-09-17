<?php
$conn = null;
$conn = checkDbConnection();
$productPrice = new ProductPrice($conn);
$error = [];
$returnData = [];
if (array_key_exists("productpriceid", $_GET)) {

    $productPrice->product_price_aid = $_GET['productpriceid'];
    checkId($productPrice->product_price_aid);

    $productPrice->product_price_stock_out = intval($data['product_price_stock_out']);
    $productPrice->product_price_supply_id = intval($data['product_price_supply_id']);

    isStockOutExist($productPrice, $productPrice->product_price_stock_out);

    $query = checkDelete($productPrice);

    $productPrice->receiving_supply_have_price = 0;
    checkHavePrice($productPrice);
    returnSuccess($productPrice, "product price", $query);
}

checkEndpoint();
