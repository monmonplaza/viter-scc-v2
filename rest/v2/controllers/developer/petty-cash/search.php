<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/petty-cash/PettyCash.php';

$conn = null;
$conn = checkDbConnection();

$pettyCash = new PettyCash($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $pettyCash->pettycash_search = $data["searchValue"];    // get data

    checkKeyword($pettyCash->pettycash_search);
    $query = checkSearch($pettyCash);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
