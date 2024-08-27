<?php
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingsupplyid", $_GET)) {
    checkPayload($data);

    $receiving_supply->receiving_supply_aid = $_GET['receivingsupplyid'];
    $receiving_supply->receiving_supply_id = checkIndex($data, "receiving_supply_id");
    $receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->receiving_supply_supplier_id = checkIndex($data, "receiving_supply_supplier_id");
    $receiving_supply->receiving_supply_unit = checkIndex($data, "receiving_supply_unit");
    $receiving_supply->receiving_supply_quantity = checkIndex($data, "receiving_supply_quantity");
    $receiving_supply->receiving_supply_price = checkIndex($data, "receiving_supply_price");
    $receiving_supply->receiving_supply_amount = checkIndex($data, "receiving_supply_amount");

    $receiving_supply->receiving_supply_is_active = 1;
    $receiving_supply->receiving_supply_datetime = date("Y-m-d H:i:s");
    // $receiving_supply_date_old = strtolower($data["receiving_supply_date_old"]);

    checkId($receiving_supply->receiving_supply_aid);

    // compareName($receiving_supply, $receiving_supply_date_old, $receiving_supply->receiving_supply_date);


    $query = checkUpdate($receiving_supply);
    returnSuccess($receiving_supply, "receiving_supply", $query);
}

checkEndpoint();
