<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving-supply/ReceivingSupply.php';
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("receivingsupplyid", $_GET)) {

        checkPayload($data);
        $receiving_supply->receiving_supply_aid = $_GET['receivingsupplyid'];
        $receiving_supply->receiving_supply_is_active = trim($data["isActive"]);
        checkId($receiving_supply->receiving_supply_aid);
        $query = checkActive($receiving_supply);
        http_response_code(200);
        returnSuccess($receiving_supply, "Receiving Supply", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
