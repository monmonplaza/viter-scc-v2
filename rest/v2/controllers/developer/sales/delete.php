<?php
$conn = null;
$conn = checkDbConnection();
$sales = new Sales($conn);
$error = [];
$returnData = [];
if (array_key_exists("salesid", $_GET)) {
    $sales->sales_aid = $_GET['salesid'];
    checkId($sales->sales_aid);
    isAssociated($sales);

    $query = checkDelete($sales);
    returnSuccess($sales, "sales", $query);
}

checkEndpoint();
