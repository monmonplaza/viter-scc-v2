<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/purchase/Purchase.php';
$conn = null;
$conn = checkDbConnection();
$purchase = new Purchase($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("purchaseid", $_GET)) {

        checkPayload($data);

        $purchase->purchase_aid = $_GET['purchaseid'];
        $purchase->purchase_is_ongoing = trim($data["isActive"]);
        $purchase->purchase_updated = date("Y-m-d H:i:s");

        checkId($purchase->purchase_aid);
        $query = checkActive($purchase);

        http_response_code(200);
        returnSuccess($purchase, "Return Product", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
