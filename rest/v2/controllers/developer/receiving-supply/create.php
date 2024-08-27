<?php
$conn = null;
$conn = checkDbConnection();

$receiving_supply = new ReceivingSupply($conn);

if (array_key_exists("receiving_supplyid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$receiving_supply->receiving_date = checkIndex($data, "receiving_date");
$receiving_supply->receiving_supply_received_id = checkIndex($data, "receiving_supply_received_id");
$receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
$receiving_supply->receiving_supply_supplier_id = checkIndex($data, "receiving_supply_supplier_id");
$receiving_supply->receiving_supply_unit_id = checkIndex($data, "receiving_supply_unit_id");
$receiving_supply->receiving_supply_quantity = checkIndex($data, "receiving_supply_quantity");
$receiving_supply->receiving_supply_price = checkIndex($data, "receiving_supply_price");
$receiving_supply->receiving_supply_amount = checkIndex($data, "receiving_supply_amount");

$receiving_supply->receiving_supply_is_active = 1;
$receiving_supply->receiving_is_active = 1;
$receiving_supply->receiving_supply_created = date("Y-m-d H:i:s");
$receiving_supply->receiving_supply_datetime = date("Y-m-d H:i:s");

if (intval($receiving_supply->receiving_supply_received_id) > 0) {
    checkCreateReceiving($receiving_supply);
} else {
    $receiving_supply->lastInsertedId = checkIndex($data, "receiving_supply_received_id");
}

$query = checkCreate($receiving_supply);
returnSuccess($receiving_supply, "receiving_supply", $query);
