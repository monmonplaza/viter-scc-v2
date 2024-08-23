<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/supplier/Supplier.php';
$conn = null;
$conn = checkDbConnection();
$supplier = new Supplier($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $supplier->supplier_start = $_GET['start'];
        $supplier->supplier_total = 50;
        checkLimitId($supplier->supplier_start, $supplier->supplier_total);
        $query = checkReadLimit($supplier);
        $total_result = checkReadAll($supplier);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $supplier->supplier_total,
            $supplier->supplier_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
