<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/customer/Customer.php';

$conn = null;
$conn = checkDbConnection();
$customer = new Customer($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $customer->customer_start = $_GET['start'];
        $customer->customer_total = 50;
        checkLimitId($customer->customer_start, $customer->customer_total);
        $query = checkReadLimit($customer);
        $total_result = checkReadAll($customer);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $customer->customer_total,
            $customer->customer_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
