<?php
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingsupplyid", $_GET)) {
    $receiving_supply->receiving_supply_received_id = $_GET['receivingsupplyid'];
    checkId($receiving_supply->receiving_supply_received_id);
    $query = checkReadById($receiving_supply);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($receiving_supply);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
