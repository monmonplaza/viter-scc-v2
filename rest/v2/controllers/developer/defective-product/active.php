<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/defective-product/DefectiveProduct.php';

$conn = null;
$conn = checkDbConnection();
$defectiveProduct = new DefectiveProduct($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("defectiveproductid", $_GET)) {

        checkPayload($data);
        $defectiveProduct->defective_product_aid = $_GET['defectiveproductid'];
        $defectiveProduct->defective_product_is_resolve = trim($data["isActive"]);
        $defectiveProduct->defective_product_receiving_supply_id = checkIndex($data, "receiving_supply_aid");



        checkId($defectiveProduct->defective_product_aid);

        if (intval($defectiveProduct->defective_product_is_resolve) == 1) {
            $defectiveProduct->receiving_supply_defective_product_qty = 0;
        } else {
            $defectiveProduct->defective_product_resolved_date = "";
            $defectiveProduct->receiving_supply_defective_product_qty = $data["defective_product_qty"];
        }

        checkUpdateReceivingSupply($defectiveProduct);

        $query = checkActive($defectiveProduct);

        // FOR INVETORY ONLY
        // DEFECTIVE   
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
        http_response_code(200);
        returnSuccess($defectiveProduct, "defectiveProduct", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
