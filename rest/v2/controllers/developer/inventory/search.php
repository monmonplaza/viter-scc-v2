<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/inventory/Inventory.php';

$conn = null;
$conn = checkDbConnection();

$inventory = new Inventory($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $inventory->inventory_log_search = $data["searchValue"];    // get data

    checkKeyword($inventory->inventory_log_search);
    $query = checkSearch($inventory);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
