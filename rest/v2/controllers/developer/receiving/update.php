<?php
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingid", $_GET)) {
    checkPayload($data);

    $receiving->receiving_aid = $_GET['receivingid'];
    $receiving->receiving_date = checkIndex($data, "receiving_date");

    $receiving->receiving_is_complete = 0;
    $receiving->receiving_datetime = date("Y-m-d H:i:s");
    $receiving_date_old = strtolower($data["receiving_date_old"]);

    checkId($receiving->receiving_aid);

    compareName($receiving, $receiving_date_old, $receiving->receiving_date);


    $query = checkUpdate($receiving);
    returnSuccess($receiving, "receiving", $query);
}

checkEndpoint();
