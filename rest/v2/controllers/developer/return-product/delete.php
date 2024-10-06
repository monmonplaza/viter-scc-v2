<?php
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("returnproductid", $_GET)) {
    checkPayload($data);

    $productReturn->return_product_aid = $_GET['returnproductid'];
    $productReturn->return_product_sales_list_id = checkIndex($data, "return_product_sales_list_id");
    $productReturn->return_product_updated = date("Y-m-d H:i:s");
    checkId($productReturn->return_product_aid);
    $query = checkDelete($productReturn);

    // FOR INVETORY ONLY
    // STOCK IN
    $productReturn->return_product_id = checkIndex($data, "return_product_id");

    $sales_list_quantity = $data["sales_list_quantity"];

    // UPDATE INVENTORY
    $updateInventoryRefund = getResultData($productReturn->checkReturnProductTotalQty());
    if (count($updateInventoryRefund) > 0) {
        $productReturn->inventory_log_return_product = checkIndex($updateInventoryRefund[0], "total_return_product_qty");
    } else {
        $productReturn->inventory_log_return_product = 0;
    }
    checkUpdateInventoryReturnProduct($productReturn);

    $productReturn->sales_list_total_qty = (float)$sales_list_quantity - (float)$productReturn->inventory_log_return_product;
    checkUpdateSalesListRefund($productReturn);

    returnSuccess($productReturn, "Return Product", $query);
}

checkEndpoint();
