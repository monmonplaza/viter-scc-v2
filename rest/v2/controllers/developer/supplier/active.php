<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/supplier/Supplier.php';
$conn = null;
$conn = checkDbConnection();
$supplier = new Supplier($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("supplierid", $_GET)) {

        checkPayload($data);
        $supplier->supplier_aid = $_GET['supplierid'];
        $supplier->supplier_is_active = trim($data["isActive"]);
        $supplier->supplier_datetime = date("Y-m-d H:i:s");

        checkId($supplier->supplier_aid);
        $query = checkActive($supplier);
        http_response_code(200);
        returnSuccess($supplier, "supplier", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
