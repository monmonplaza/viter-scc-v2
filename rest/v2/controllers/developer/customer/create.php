<?php
$conn = null;
$conn = checkDbConnection();

$customer = new Customer($conn);

if (array_key_exists("customerid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$customer->customer_name = checkIndex($data, "customer_name");
$customer->customer_address = $data["customer_address"];
$customer->customer_mobile_number = $data["customer_mobile_number"];
$customer->customer_is_member = $data["customer_is_member"];
$customer->customer_is_active = 1;
$customer->customer_created = date("Y-m-d H:i:s");
$customer->customer_updated = date("Y-m-d H:i:s");


isNameExist($customer, $customer->customer_name);

$query = checkCreate($customer);
returnSuccess($customer, "customer", $query);
