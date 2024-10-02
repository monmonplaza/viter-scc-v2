<?php
$conn = null;
$conn = checkDbConnection();

$purchase = new Purchase($conn);

if (array_key_exists("purchaseid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$purchase->purchase_delivery_start_date = checkIndex($data, "purchase_delivery_start_date");
$purchase->purchase_delivery_end_date = checkIndex($data, "purchase_delivery_end_date");
$purchase->purchase_date = checkIndex($data, "purchase_date");
$purchase->purchase_product_id = checkIndex($data, "purchase_product_id");
$purchase->purchase_quantity = checkIndex($data, "purchase_quantity");
$purchase->purchase_supplier_id = checkIndex($data, "purchase_supplier_id");
$purchase->purchase_unit_id = checkIndex($data, "purchase_unit_id");
$purchase->purchase_price = checkIndex($data, "purchase_price");
$purchase->purchase_reference_no = $data["purchase_reference_no"];
$purchase->purchase_total_amount = $data["purchase_total_amount"];
$purchase->purchase_is_ongoing = 0;
$purchase->purchase_is_new_data = 1;
$purchase->purchase_created = date("Y-m-d H:i:s");
$purchase->purchase_updated = date("Y-m-d H:i:s");

if (intval($purchase->purchase_reference_no) === 0) {
    $purchase->purchase_reference_no = rand(1, 9) . rand(1000, 9999)  .  rand(1, 9) .  rand(100, 999);
}

$query = checkCreate($purchase);
checkUpdatePurchaseDate($purchase);

returnSuccess($purchase, "Return Product", $query);
