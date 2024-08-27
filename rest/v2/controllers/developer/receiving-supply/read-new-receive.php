<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving-supply/ReceivingSupply.php';


$conn = null;
$conn = checkDbConnection();
$receivingSupply = new ReceivingSupply($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $query = checkReadAllNewReceiveSupply($receivingSupply);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
