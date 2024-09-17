<?php
$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$error = [];
$returnData = [];
if (array_key_exists("saleslistid", $_GET)) {
    checkPayload($data);

    $salesList->sales_list_aid = $_GET['saleslistid'];
    checkId($salesList->sales_list_aid);

    $query = checkDelete($salesList);

    returnSuccess($salesList, "Sales List", $query);
}

checkEndpoint();
