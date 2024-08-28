<?php
$conn = null;
$conn = checkDbConnection();

$receiving = new Receiving($conn);

if (array_key_exists("receivingid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$receiving->receiving_date = checkIndex($data, "receiving_date");
$receiving->receiving_reference_no = checkIndex($data, "receiving_reference_no");

$receiving->receiving_is_active = 1;
$receiving->receiving_created = date("Y-m-d H:i:s");
$receiving->receiving_datetime = date("Y-m-d H:i:s");


isNameExist($receiving, $receiving->receiving_date);

$query = checkCreate($receiving);
returnSuccess($receiving, "receiving", $query);
