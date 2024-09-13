<?php
$conn = null;
$conn = checkDbConnection();
$inventory = new Inventory($conn);
$error = [];
$returnData = [];
if (array_key_exists("inventoryid", $_GET)) {
    $inventory->inventory_log_aid = $_GET['inventoryid'];
    checkId($inventory->inventory_log_aid);
    $query = checkReadById($inventory);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($inventory);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
