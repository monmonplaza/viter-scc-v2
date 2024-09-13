<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/return-product/ReturnProduct.php';

$conn = null;
$conn = checkDbConnection();

$productReturn = new ReturnProduct($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $productReturn->return_product_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($productReturn->return_product_search != "") {

            checkKeyword($productReturn->return_product_search);
            $productReturn->return_product_is_resolved = checkIndex($data, "return_product_is_resolved");
            $query = checkFilterByStatusAndSearch($productReturn);
            http_response_code(200);
            getQueriedData($query);
        }


        $productReturn->return_product_is_resolved = checkIndex($data, "return_product_is_resolved");
        $query = checkFilterByStatus($productReturn);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($productReturn->return_product_search);
    $query = checkSearch($productReturn);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
