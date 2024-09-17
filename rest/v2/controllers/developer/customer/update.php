<?php
$conn = null;
$conn = checkDbConnection();
$customer = new Customer($conn);
$error = [];
$returnData = [];
if (array_key_exists("customerid", $_GET)) {
    checkPayload($data);

    $customer->customer_aid = $_GET['customerid'];
    $customer->customer_name = checkIndex($data, "customer_name");
    $customer->customer_address = checkIndex($data, "customer_address");
    $customer->customer_mobile_number = checkIndex($data, "customer_mobile_number");
    $customer->customer_is_member = $data["customer_is_member"];

    $customer->customer_updated = date("Y-m-d H:i:s");
    $customer_name_old = strtolower($data["customer_name_old"]);

    checkId($customer->customer_aid);

    compareName($customer, $customer_name_old, $customer->customer_name);


    $query = checkUpdate($customer);
    returnSuccess($customer, "customer", $query);
}

checkEndpoint();
