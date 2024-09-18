<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/sales-list/SalesList.php';

$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $salesList->sales_aid = $data["sales_aid"];

    if (intval($salesList->sales_aid) == 0) {
        $query = checkReadAllNewData($salesList);
        http_response_code(200);
        getQueriedData($query);
    } else {
        $query = checkReadById($salesList);
        http_response_code(200);
        getQueriedData($query);
    }
}

http_response_code(200);
checkAccess();
