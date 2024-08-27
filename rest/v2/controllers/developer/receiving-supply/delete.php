<?php
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingsupplyid", $_GET)) {
    $receiving_supply->receiving_supply_aid  = $_GET['receivingsupplyid'];
    checkId($receiving_supply->receiving_supply_aid);
    // isAssociated($receiving_supply);
    $query = checkDelete($receiving_supply);
    returnSuccess($receiving_supply, "Receiving Supply", $query);
}

checkEndpoint();
