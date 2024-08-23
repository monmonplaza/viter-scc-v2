<?php
$conn = null;
$conn = checkDbConnection();
$supplier = new Supplier($conn);
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {
    $supplier->supplier_aid  = $_GET['supplierid'];
    checkId($supplier->supplier_aid);
    // isAssociated($supplier);
    $query = checkDelete($supplier);
    returnSuccess($supplier, "supplier", $query);
}

checkEndpoint();
