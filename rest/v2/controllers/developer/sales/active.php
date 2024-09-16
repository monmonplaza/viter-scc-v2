<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/sales/Sales.php';
$conn = null;
$conn = checkDbConnection();
$sales = new Sales($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("salesid", $_GET)) {

        checkPayload($data);
        $sales->sales_aid = $_GET['salesid'];
        $sales->sales_is_paid = trim($data["isActive"]);
        $sales->sales_updated = date("Y-m-d H:i:s");

        checkId($sales->sales_aid);
        $query = checkActive($sales);

        // FOR INVETORY ONLY 
        // FOR INVETORY ONLY 
        $sales->inventory_log_updated = date("Y-m-d H:i:s");
        $productInventory = getResultData($sales->checkInventoryLog());

        if (count($productInventory) > 0) {
            for ($i = 0; $i < count($productInventory); $i++) {
                $sales->sales_supply_product_id = checkIndex($productInventory[$i], "product_aid");
                $sales->inventory_log_product_id = checkIndex($productInventory[$i], "product_aid");
                $sales->inventory_log_stock_out = 0;

                // FOR INVETORY ONLY
                // STOCK OUT 
                $updateInventoryStockOut = getResultData($sales->checkProductTotalQty());
                if (count($updateInventoryStockOut) > 0) {
                    $sales->inventory_log_stock_out = checkIndex($updateInventoryStockOut[0], "total_product_stock_qty");
                }
                checkUpdateInventoryStockOut($sales);
            }
        }

        http_response_code(200);
        returnSuccess($sales, "sales", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
