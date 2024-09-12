<?php
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("returnproductid", $_GET)) {
    checkPayload($data);

    $productReturn->return_product_aid = $_GET['returnproductid'];
    checkId($productReturn->return_product_aid);
    $query = checkDelete($productReturn);

    // FOR INVETORY ONLY
    // STOCK IN
    $productReturn->return_product_id = checkIndex($data, "return_product_id");
    $productReturn->inventory_log_product_id = checkIndex($data, "return_product_id");
    $productReturn->inventory_log_updated = date("Y-m-d H:i:s");

    $updateInventoryReturnProduct = getResultData($productReturn->checkReturnProductTotalQty());

    if (count($updateInventoryReturnProduct) > 0) {
        $productReturn->inventory_log_return_product = checkIndex($updateInventoryReturnProduct[0], "total_return_product_qty");
    } else {
        $productReturn->inventory_log_return_product = 0;
    }


    checkUpdateInventoryReturnProduct($productReturn);
    returnSuccess($productReturn, "Return Product", $query);
}

checkEndpoint();
