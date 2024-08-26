<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/receiving/Receiving.php';
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("receivingid", $_GET)) {

        checkPayload($data);
        $receiving->receiving_aid = $_GET['receivingid'];
        $receiving->receiving_is_active = trim($data["isActive"]);
        checkId($receiving->receiving_aid);
        $query = checkActive($receiving);
        http_response_code(200);
        returnSuccess($receiving, "receiving", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
