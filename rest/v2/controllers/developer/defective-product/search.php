<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/defective-product/DefectiveProduct.php';

$conn = null;
$conn = checkDbConnection();

$defectiveProduct = new DefectiveProduct($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $defectiveProduct->defective_product_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($defectiveProduct->defective_product_search != "") {

            checkKeyword($defectiveProduct->defective_product_search);
            $defectiveProduct->defective_product_is_resolve = checkIndex($data, "defective_product_is_resolve");
            $query = checkFilterByStatusAndSearch($defectiveProduct);
            http_response_code(200);
            getQueriedData($query);
        }


        $defectiveProduct->defective_product_is_resolve = checkIndex($data, "defective_product_is_resolve");
        $query = checkFilterByStatus($defectiveProduct);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($defectiveProduct->defective_product_search);
    $query = checkSearch($defectiveProduct);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
