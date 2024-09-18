<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/sales-list/SalesList.php';

$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$response = new Response();

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    $salesList->sales_updated = date("Y-m-d H:i:s");

    $isNewData = getResultData($salesList->checkGetSalesLastAid());

    if (count($isNewData) > 0) {
        $salesList->sales_aid = checkIndex($isNewData[0], "sales_aid");
    }
    $query = checkUpdateSalesNewData($salesList);
    returnSuccess($salesList, "accept payment", $query);
}

http_response_code(200);
checkAccess();
