<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/return-product/ReturnProduct.php';
$conn = null;
$conn = checkDbConnection();
$productReturn = new ReturnProduct($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("returnproductid", $_GET)) {

        checkPayload($data);

        $productReturn->return_product_aid = $_GET['returnproductid'];
        $productReturn->return_product_is_resolved = trim($data["isActive"]);
        $productReturn->return_product_updated = date("Y-m-d H:i:s");

        if (intval($productReturn->return_product_is_resolved) === 1) {
            $productReturn->return_product_resolved_date = date("Y-m-d");
        } else {
            $productReturn->return_product_resolved_date = "";
        }

        checkId($productReturn->return_product_aid);
        $query = checkActive($productReturn);


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
        http_response_code(200);
        returnSuccess($productReturn, "Return Product", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
