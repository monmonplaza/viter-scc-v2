<?php
$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$error = [];
$returnData = [];
if (array_key_exists("defectiveproductid", $_GET)) {
    checkPayload($data);

    $defectiveProduct->defective_product_aid = $_GET['defectiveproductid'];
    $defectiveProduct->defective_product_receiving_supply_id = checkIndex($data, "defective_product_receiving_supply_id");
    $defectiveProduct->defective_product_qty = checkIndex($data, "defective_product_qty");
    $defectiveProduct->defective_product_amount = checkIndex($data, "defective_product_amount");
    $defectiveProduct->defective_product_is_refund = checkIndex($data, "defective_product_is_refund");
    $defectiveProduct->defective_product_remarks = $data["defective_product_remarks"];

    $defectiveProduct->defective_product_updated = date("Y-m-d H:i:s");
    checkId($defectiveProduct->defective_product_aid);

    $query = checkUpdate($defectiveProduct);
    returnSuccess($defectiveProduct, "defectiveProduct", $query);
}

checkEndpoint();
