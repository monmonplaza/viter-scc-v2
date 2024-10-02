<?php
$conn = null;
$conn = checkDbConnection();
$purchase = new Purchase($conn);
$error = [];
$returnData = [];
if (array_key_exists("purchaseid", $_GET)) {
    checkPayload($data);

    $purchase->purchase_aid = $_GET['purchaseid'];
    $purchase->purchase_product_id = checkIndex($data, "purchase_product_id");
    $purchase->purchase_delivery_start_date = checkIndex($data, "purchase_delivery_start_date");
    $purchase->purchase_delivery_end_date = checkIndex($data, "purchase_delivery_end_date");
    $purchase->purchase_date = checkIndex($data, "purchase_date");
    $purchase->purchase_quantity = checkIndex($data, "purchase_quantity");
    $purchase->purchase_remarks = checkIndex($data, "purchase_remarks");
    $purchase->purchase_supplier_id = checkIndex($data, "purchase_supplier_id");
    $purchase->purchase_updated = date("Y-m-d H:i:s");

    checkId($purchase->purchase_aid);

    $query = checkUpdate($purchase);
    returnSuccess($purchase, "purchase", $query);
}

checkEndpoint();
