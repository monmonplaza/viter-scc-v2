<?php
$conn = null;
$conn = checkDbConnection();
$receiving_supply = new ReceivingSupply($conn);
$error = [];
$returnData = [];
if (array_key_exists("receivingsupplyid", $_GET)) {
    checkPayload($data);

    $receiving_supply->receiving_supply_aid = $_GET['receivingsupplyid'];
    $receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->inventory_log_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->inventory_log_updated = date("Y-m-d H:i:s");
    checkId($receiving_supply->receiving_supply_aid);

    isAssociateDefective($receiving_supply);

    $query = checkDelete($receiving_supply);
    checkDeleteDefective($receiving_supply);

    // // FOR INVETORY ONLY
    // // STOCK IN
    // $updateInventoryStockIn = getResultData($receiving_supply->checkProductTotalQty());
    // if (count($updateInventoryStockIn) > 0) {
    //     $receiving_supply->inventory_log_stock_in = checkIndex($updateInventoryStockIn[0], "total_product_stock_qty");
    // } else {
    //     $receiving_supply->inventory_log_stock_in = 0;
    // }

    // // FOR INVETORY ONLY
    // // DEFECTIVE  
    // $updateInventoryDefective = getResultData($receiving_supply->checkDefectiveProductTotalQty());
    // if (count($updateInventoryDefective) > 0) {
    //     $receiving_supply->inventory_log_defective_product = checkIndex($updateInventoryDefective[0], "total_defective_product_qty");
    // } else {
    //     $receiving_supply->inventory_log_defective_product = 0;
    // }
    // checkUpdateInventoryStockIn($receiving_supply);
    // checkUpdateInventoryDefectiveProduct($receiving_supply);
    returnSuccess($receiving_supply, "Receiving Supply", $query);
}

checkEndpoint();
