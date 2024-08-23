<?php
$conn = null;
$conn = checkDbConnection();
$supplier = new Supplier($conn);
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {
    $supplier->supplier_aid = $_GET['supplierid'];
    checkId($supplier->supplier_aid);
    $query = checkReadById($supplier);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($supplier);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
