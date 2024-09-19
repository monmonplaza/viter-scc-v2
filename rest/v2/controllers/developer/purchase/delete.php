<?php
$conn = null;
$conn = checkDbConnection();
$purchase = new Purchase($conn);
$error = [];
$returnData = [];
if (array_key_exists("purchaseid", $_GET)) {
    checkPayload($data);

    $purchase->purchase_reference_no = $_GET['purchaseid'];
    checkId($purchase->purchase_reference_no);
    $query = checkDelete($purchase);

    returnSuccess($purchase, "purchase", $query);
}

checkEndpoint();
