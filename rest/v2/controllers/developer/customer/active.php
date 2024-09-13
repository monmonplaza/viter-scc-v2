<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/customer/Customer.php';
$conn = null;
$conn = checkDbConnection();
$customer = new Customer($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("customerid", $_GET)) {

        checkPayload($data);
        $customer->customer_aid = $_GET['customerid'];
        $customer->customer_is_active = trim($data["isActive"]);
        $customer->customer_updated = date("Y-m-d H:i:s");

        checkId($customer->customer_aid);
        $query = checkActive($customer);
        http_response_code(200);
        returnSuccess($customer, "customer", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
