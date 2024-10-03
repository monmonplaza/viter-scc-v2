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
$productReturn->return_product_is_refund = checkIndex($data, "return_product_is_refund");
$productReturn->return_product_is_resolved = 0;
$productReturn->return_product_created = date("Y-m-d H:i:s");
$productReturn->return_product_updated = date("Y-m-d H:i:s");

$query = checkCreate($productReturn);

// $productReturn->sales_list_return_qty = 0;
// $productReturn->sales_list_total_qty = 0;

// $updateInventoryDefective = getResultData($defectiveProduct->readSalesListRefund());
// if (count($updateInventoryDefective) > 0) {
//     $defectiveProduct->inventory_log_defective_product = checkIndex($updateInventoryDefective[0], "total_defective_product_qty");
// } else {
//     $defectiveProduct->inventory_log_defective_product = 0;
// }


returnSuccess($productReturn, "Return Product", $query);
