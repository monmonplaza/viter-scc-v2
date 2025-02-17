<?php
$conn = null;
$conn = checkDbConnection();

$productPrice = new ProductPrice($conn);

if (array_key_exists("productpriceid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$productPrice->product_price_product_id = checkIndex($data, "product_price_product_id");
$productPrice->product_price_supply_id = checkIndex($data, "product_price_supply_id");
$productPrice->product_price_scc_price = checkIndex($data, "product_price_scc_price");
$productPrice->product_price_scc_percent = checkIndex($data, "product_price_scc_percent");
$productPrice->product_price_amount = checkIndex($data, "product_price_amount");
$productPrice->product_price_percent = checkIndex($data, "product_price_percent");
$productPrice->product_price_whole_sale_amount = checkIndex($data, "product_price_whole_sale_amount");
$productPrice->product_price_whole_sale_percent = checkIndex($data, "product_price_whole_sale_percent");
$productPrice->product_price_scc_whole_sale_amount = checkIndex($data, "product_price_scc_whole_sale_amount");
$productPrice->product_price_scc_whole_sale_percent = checkIndex($data, "product_price_scc_whole_sale_percent");
$productPrice->product_price_stock_in = checkIndex($data, "product_price_stock_in");
$productPrice->product_price_available_stock = checkIndex($data, "product_price_available_stock");
$productPrice->product_price_created = date("Y-m-d H:i:s");
$productPrice->product_price_update = date("Y-m-d H:i:s");

$productPrice->product_price_whole_sale_qty = $data["product_price_whole_sale_qty"];
$productPrice->product_price_promo_end_date = $data["product_price_promo_end_date"];
$productPrice->product_price_promo_percent = $data["product_price_promo_percent"];
$productPrice->product_price_promo_amount = $data["product_price_promo_amount"];
// IF SALES HAVE
$productPrice->product_price_stock_out = 0;

isReceivingSupplyExist($productPrice);

$query = checkCreate($productPrice);

$productPrice->receiving_supply_have_price = 1;
checkHavePrice($productPrice);

returnSuccess($productPrice, "product price", $query);
