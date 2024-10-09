<?php
$conn = null;
$conn = checkDbConnection();
$pettyCash = new PettyCash($conn);
$error = [];
$returnData = [];
if (array_key_exists("pettycashid", $_GET)) {
    $pettyCash->petty_cash_aid = $_GET['pettycashid'];
    checkId($pettyCash->petty_cash_aid);
    $query = checkReadById($pettyCash);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($pettyCash);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
