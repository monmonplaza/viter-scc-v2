<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/purchase/Purchase.php';

$conn = null;
$conn = checkDbConnection();

$purchase = new purchase($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $purchase->purchase_search = $data["searchValue"];    // get data

    if ($data["isFilter"] == true) {
        $purchase->purchase_date = checkIndex($data, "filterDate");
        $query = checkFilterByDate($purchase);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($purchase->purchase_search);
    $query = checkSearch($purchase);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
