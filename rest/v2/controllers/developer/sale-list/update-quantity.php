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

    $salesList->sales_list_aid = $data['sales_list_aid'];
    $salesList->sales_list_quantity = $data['sales_list_quantity'];
    $salesList->sales_list_updated = date("Y-m-d H:i:s");

    $query = checkUpdateQuantity($salesList);
    returnSuccess($salesList, "udpate quantity", $query);
}

http_response_code(200);
checkAccess();
