<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/customer/Customer.php';

$conn = null;
$conn = checkDbConnection();

$customer = new Customer($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $customer->customer_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($customer->customer_search != "") {

            checkKeyword($customer->customer_search);
            $customer->customer_is_active = checkIndex($data, "customer_is_active");
            $query = checkFilterByStatusAndSearch($customer);
            http_response_code(200);
            getQueriedData($query);
        }


        $customer->customer_is_active = checkIndex($data, "customer_is_active");
        $query = checkFilterByStatus($customer);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($customer->customer_search);
    $query = checkSearch($customer);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
