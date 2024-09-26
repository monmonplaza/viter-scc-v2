<?php
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingsupplyid", $_GET)) {
    checkPayload($data);

    $receiving_supply->receiving_supply_aid = $_GET['receivingsupplyid'];
    $receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->inventory_log_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->inventory_log_updated = date("Y-m-d H:i:s");
    checkId($receiving_supply->receiving_supply_aid);

    isAssociateDefective($receiving_supply);
    isAssociateProductPrice($receiving_supply);

    $query = checkDelete($receiving_supply);
    checkDeleteDefective($receiving_supply);

    returnSuccess($receiving_supply, "Receiving Supply", $query);
}

checkEndpoint();
