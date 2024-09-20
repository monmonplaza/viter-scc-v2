<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/purchase/Purchase.php';
$conn = null;
$conn = checkDbConnection();
$purchase = new Purchase($conn);
$response = new Response();

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $purchase->purchase_updated = date("Y-m-d H:i:s");

    $query = checkUpdateNewData($purchase);
    returnSuccess($purchase, "purchase", $query);
}

http_response_code(200);
checkAccess();
