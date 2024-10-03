<?php
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("returnproductid", $_GET)) {
    checkPayload($data);

    $productReturn->return_product_aid = $_GET['returnproductid'];
    $productReturn->return_product_id = checkIndex($data, "return_product_id");
    $productReturn->return_product_sales_list_id = checkIndex($data, "return_product_sales_list_id");
    $productReturn->return_product_date = checkIndex($data, "return_product_date");
    $productReturn->return_product_qty = checkIndex($data, "return_product_qty");
    $productReturn->return_product_is_refund = checkIndex($data, "return_product_is_refund");
    $productReturn->return_product_remarks = checkIndex($data, "return_product_remarks");
    $productReturn->return_product_is_resolved = 0;
    $productReturn->return_product_updated = date("Y-m-d H:i:s");

    checkId($productReturn->return_product_aid);

    $query = checkUpdate($productReturn);
    returnSuccess($productReturn, "Return Product", $query);
}

checkEndpoint();
