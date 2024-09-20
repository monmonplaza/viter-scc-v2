<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/purchase/Purchase.php';
$conn = null;
$conn = checkDbConnection();
$purchase = new purchase($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $purchase->purchase_updated = date("Y-m-d H:i:s");
        checkUpdateNewData($purchase);

        $purchase->purchase_start = $_GET['start'];
        $purchase->purchase_total = 50;
        checkLimitId($purchase->purchase_start, $purchase->purchase_total);
        $query = checkReadGroupByReferenceNoLimit($purchase);
        $total_result = checkReadGroupByReferenceNo($purchase);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $purchase->purchase_total,
            $purchase->purchase_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
