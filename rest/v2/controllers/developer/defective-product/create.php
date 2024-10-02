<?php
$conn = null;
$conn = checkDbConnection();

$defectiveProduct = new DefectiveProduct($conn);

if (array_key_exists("defectiveproductid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$defectiveProduct->defective_product_receiving_supply_id = checkIndex($data, "defective_product_receiving_supply_id");
$defectiveProduct->defective_product_qty = checkIndex($data, "defective_product_qty");
$defectiveProduct->defective_product_amount = checkIndex($data, "defective_product_amount");
$defectiveProduct->defective_product_is_resolve = 0;
$defectiveProduct->defective_product_is_refund = checkIndex($data, "defective_product_is_refund");
$defectiveProduct->defective_product_remarks = $data["defective_product_remarks"];
$defectiveProduct->defective_product_created = date("Y-m-d H:i:s");
$defectiveProduct->defective_product_updated = date("Y-m-d H:i:s");

isReceivedSupplyExist($defectiveProduct);

$defectiveProduct->receiving_supply_defective_product_qty = $data["defective_product_qty"];
$defectiveProduct->receiving_supply_defective_remarks = $data["defective_product_remarks"];

checkUpdateReceivingSupply($defectiveProduct);

$query = checkCreate($defectiveProduct);

if (intval($defectiveProduct->defective_product_is_refund) == 0) {
    // FOR INVETORY ONLY
    // DEFECTIVE EXCHANGE
    $defectiveProduct->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
    $defectiveProduct->inventory_log_product_id = checkIndex($data, "receiving_supply_product_id");
    $defectiveProduct->inventory_log_updated = date("Y-m-d H:i:s");
    $updateInventoryDefective = getResultData($defectiveProduct->checkDefectiveProductTotalQty());
    if (count($updateInventoryDefective) > 0) {
        $defectiveProduct->inventory_log_defective_product = checkIndex($updateInventoryDefective[0], "total_defective_product_qty");
    } else {
        $defectiveProduct->inventory_log_defective_product = 0;
    }
    checkUpdateInventoryDefectiveProduct($defectiveProduct);
} else {
    // FOR INVETORY ONLY
    // DEFECTIVE REFUND    
    $defectiveProduct->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
    $defectiveProduct->inventory_log_product_id = checkIndex($data, "receiving_supply_product_id");
    $defectiveProduct->inventory_log_updated = date("Y-m-d H:i:s");
    $updateInventoryDefectiveRefund = getResultData($defectiveProduct->readAllDefectiveRefundProductTotalQty());
    if (count($updateInventoryDefectiveRefund) > 0) {
        $defectiveProduct->inventory_log_refund_product = checkIndex($updateInventoryDefectiveRefund[0], "total_refund_product_qty");

        checkUpdateInventoryDefectiveRefundProduct($defectiveProduct);
    }
}


returnSuccess($defectiveProduct, "defectiveProduct", $query);
