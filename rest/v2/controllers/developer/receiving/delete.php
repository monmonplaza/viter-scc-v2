<?php
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingid", $_GET)) {
    $receiving->receiving_aid = $_GET['receivingid'];
    checkId($receiving->receiving_aid);
    isAssociated($receiving);

    $query = checkDelete($receiving);
    returnSuccess($receiving, "receiving", $query);
}

checkEndpoint();
