<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving/Receiving.php';
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("receivingid", $_GET)) {

        checkPayload($data);
        $receiving->receiving_aid = $_GET['receivingid'];
        $receiving->receiving_is_complete = trim($data["isActive"]);
        $receiving->receiving_datetime = date("Y-m-d H:i:s");

        checkId($receiving->receiving_aid);
        $query = checkActive($receiving);

        // FOR INVETORY ONLY 
        // FOR INVETORY ONLY 
        $receiving->inventory_log_updated = date("Y-m-d H:i:s");
        $productInventory = getResultData($receiving->checkInventoryLog());

        if (count($productInventory) > 0) {
            for ($i = 0; $i < count($productInventory); $i++) {
                $receiving->receiving_supply_product_id = checkIndex($productInventory[$i], "product_aid");
                $receiving->inventory_log_product_id = checkIndex($productInventory[$i], "product_aid");
                $receiving->inventory_log_stock_in = 0;

                // FOR INVETORY ONLY
                // STOCK IN 
                $updateInventoryStockIn = getResultData($receiving->checkProductTotalQty());
                if (count($updateInventoryStockIn) > 0) {
                    $receiving->inventory_log_stock_in = checkIndex($updateInventoryStockIn[0], "total_product_stock_qty");
                }
                checkUpdateInventoryStockIn($receiving);


                // FOR INVETORY ONLY
                // DEFECTIVE 
                $updateInventoryDefective = getResultData($receiving->checkDefectiveProductTotalQty());
                if (count($updateInventoryDefective) > 0) {
                    $receiving->inventory_log_defective_product = checkIndex($updateInventoryDefective[0], "total_defective_product_qty");
                }
                checkUpdateInventoryDefectiveProduct($receiving);
            }
        }





        http_response_code(200);
        returnSuccess($receiving, "receiving", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
