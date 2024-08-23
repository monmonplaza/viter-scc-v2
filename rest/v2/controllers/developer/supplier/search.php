<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/supplier/Supplier.php';

$conn = null;
$conn = checkDbConnection();

$supplier = new Supplier($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $supplier->supplier_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($supplier->supplier_search != "") {

            checkKeyword($supplier->supplier_search);
            $supplier->supplier_is_active = checkIndex($data, "supplier_is_active");
            $query = checkFilterByStatusAndSearch($supplier);
            http_response_code(200);
            getQueriedData($query);
        }


        $supplier->supplier_is_active = checkIndex($data, "supplier_is_active");
        $query = checkFilterByStatus($supplier);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($supplier->supplier_search);
    $query = checkSearch($supplier);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
