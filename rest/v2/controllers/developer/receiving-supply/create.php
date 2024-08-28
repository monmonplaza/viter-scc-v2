<?php
$conn = null;
$conn = checkDbConnection();

$receiving_supply = new ReceivingSupply($conn);

if (array_key_exists("receiving_supplyid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$receiving_supply->receiving_date = checkIndex($data, "receiving_date");
$receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
$receiving_supply->receiving_supply_supplier_id = checkIndex($data, "receiving_supply_supplier_id");
$receiving_supply->receiving_supply_unit_id = checkIndex($data, "receiving_supply_unit_id");
$receiving_supply->receiving_supply_quantity = checkIndex($data, "receiving_supply_quantity");
$receiving_supply->receiving_supply_price = checkIndex($data, "receiving_supply_price");
$receiving_supply->receiving_supply_amount = checkIndex($data, "receiving_supply_amount");
$receiving_supply->receiving_supply_expiration_date = $data["receiving_supply_expiration_date"];
$receiving_supply->receiving_supply_barcode = $data["receiving_supply_barcode"];
$receiving_supply->receiving_supply_is_active = 1;
$receiving_supply->receiving_supply_created = date("Y-m-d H:i:s");
$receiving_supply->receiving_supply_datetime = date("Y-m-d H:i:s");

$receiving_supply->receiving_is_complete = 0;
$receiving_supply->receiving_is_new_data = 1;
$receiving_supply->receiving_datetime = date("Y-m-d H:i:s");
$receiving_supply->receiving_total_amount = (float)$data["receiving_total_amount"]  + (float)$receiving_supply->receiving_supply_amount;

if ($receiving_supply->receiving_supply_barcode != "") {
    isBarcodeExist($receiving_supply, $receiving_supply->receiving_supply_barcode, $receiving_supply->receiving_supply_product_id);
}

$isNewData = getResultData($receiving_supply->checkDateGetLastAid());
if (count($isNewData) == 0) {
    isDateExist($receiving_supply, $receiving_supply->receiving_date);
    checkCreateReceiving($receiving_supply);
    $receiving_supply->receiving_aid = $receiving_supply->lastInsertedId;
    $receiving_supply->receiving_reference_no =  rand(1000, 9999) . "-" .  rand(0, 9) . $receiving_supply->lastInsertedId . rand(0, 9) .  "-" .  rand(1, 999);
    checkUpdateReferenceNumber($receiving_supply);
} else {
    $receiving_supply->receiving_aid = checkIndex($isNewData[0], "receiving_aid");
    checkUpdateReceiving($receiving_supply);
}

$query = checkCreate($receiving_supply);
returnSuccess($receiving_supply, "receiving_supply", $query);
