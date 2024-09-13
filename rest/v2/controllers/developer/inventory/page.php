<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/inventory/Inventory.php';
$conn = null;
$conn = checkDbConnection();
$inventory = new Inventory($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $inventory->inventory_log_start = $_GET['start'];
        $inventory->inventory_log_total = 50;
        checkLimitId($inventory->inventory_log_start, $inventory->inventory_log_total);
        $query = checkReadLimit($inventory);
        $total_result = checkReadAll($inventory);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $inventory->inventory_log_total,
            $inventory->inventory_log_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
