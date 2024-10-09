<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/petty-cash/PettyCash.php';
$conn = null;
$conn = checkDbConnection();
$pettyCash = new PettyCash($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $pettyCash->pettycash_start = $_GET['start'];
        $pettyCash->pettycash_total = 50;
        checkLimitId($pettyCash->pettycash_start, $pettyCash->pettycash_total);
        $query = checkReadLimit($pettyCash);
        $total_result = checkReadAll($pettyCash);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $pettyCash->pettycash_total,
            $pettyCash->pettycash_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
