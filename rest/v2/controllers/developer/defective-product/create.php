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

checkUpdateReceivingSupply($defectiveProduct);

$query = checkCreate($defectiveProduct);
returnSuccess($defectiveProduct, "defectiveProduct", $query);
