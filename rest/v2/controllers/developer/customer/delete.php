<?php
$conn = null;
$conn = checkDbConnection();
$customer = new Customer($conn);
$error = [];
$returnData = [];
if (array_key_exists("customerid", $_GET)) {
    $customer->customer_aid = $_GET['customerid'];
    checkId($customer->customer_aid);
    isAssociated($customer);
    $query = checkDelete($customer);
    returnSuccess($customer, "customer", $query);
}

checkEndpoint();
