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
    $salesList->sales_total_amount = $data["sales_total_amount"];
    $salesList->sales_payment_amount = $data["sales_payment_amount"];
    $salesList->sales_payment_method = $data["sales_payment_method"];
    $salesList->sales_updated = date("Y-m-d H:i:s");

    $salesList->sales_new_data = 0;
    if ($salesList->sales_payment_method == "credit") {
        $salesList->sales_is_paid = 0;
    } else {
        $salesList->sales_is_paid = 1;
    }


    $query = checkUpdateAcceptPayment($salesList);

    returnSuccess($salesList, "accept payment", $query);
}

http_response_code(200);
checkAccess();
