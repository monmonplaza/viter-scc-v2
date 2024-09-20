<?php
$conn = null;
$conn = checkDbConnection();

$productReturn = new ReturnProduct($conn);

if (array_key_exists("returnproductid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$productReturn->return_product_id = checkIndex($data, "return_product_id");
$productReturn->return_product_sales_list_id = checkIndex($data, "return_product_sales_list_id");
$productReturn->return_product_date = checkIndex($data, "return_product_date");
$productReturn->return_product_qty = checkIndex($data, "return_product_qty");
$productReturn->return_product_remarks = checkIndex($data, "return_product_remarks");
$productReturn->return_product_is_resolved = 0;
$productReturn->return_product_created = date("Y-m-d H:i:s");
$productReturn->return_product_updated = date("Y-m-d H:i:s");

$query = checkCreate($productReturn);
returnSuccess($productReturn, "Return Product", $query);
