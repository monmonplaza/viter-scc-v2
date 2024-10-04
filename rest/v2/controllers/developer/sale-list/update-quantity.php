<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/sales-list/SalesList.php';

$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);

    $salesList->sales_list_aid = $data['sales_list_aid'];
    $salesList->sales_list_quantity = $data['sales_list_quantity'];
    $salesList->product_price_available_stock = $data['product_price_available_stock'];
    $salesList->sales_list_updated = date("Y-m-d H:i:s");

    $sales_list_quantity_old = $data['sales_list_quantity_old'];

    $qty = (float)$sales_list_quantity_old + (float)$salesList->product_price_available_stock;

    $isValidQtyProduct = (float)$qty - (float)$salesList->sales_list_quantity;

    if ($isValidQtyProduct < 0) {
        returnError("Invalid Quantity");
    }

    $salesList->sales_list_total_qty = (float)$data['sales_list_quantity'] - (float)$data['sales_list_return_qty'];

    $query = checkUpdateQuantity($salesList);

    $salesList->inventory_log_product_id = 0;
    $salesList->inventory_log_stock_out = 0;
    $salesList->product_price_aid = 0;
    $salesList->product_price_stock_out = 0;
    $salesList->product_price_aid = 0;
    $salesList->product_price_available_stock = 0;

    $soldProduct = getResultData($salesList->checkProductSold());
    if (count($soldProduct) > 0) {
        for ($i = 0; $i < count($soldProduct); $i++) {

            $salesList->inventory_log_product_id = $soldProduct[$i]['sales_list_product_id'];
            $salesList->inventory_log_stock_out = $soldProduct[$i]['total_sold'];

            checkUpdateInventoryStockOut($salesList);
        }
    }

    $soldProductPrice = getResultData($salesList->checkProductPriceSold());
    if (count($soldProductPrice) > 0) {
        for ($e = 0; $e < count($soldProductPrice); $e++) {

            $salesList->product_price_aid = $soldProductPrice[$e]['sales_list_product_price_id'];
            $salesList->product_price_stock_out = $soldProductPrice[$e]['total_sold'];

            checkUpdateProductPriceSoldOut($salesList);
        }
    }
    $receivedProduct = getResultData($salesList->checkReadReceivingSupply());
    if (count($receivedProduct) > 0) {
        for ($a = 0; $a < count($receivedProduct); $a++) {

            $product_price_stock_in = $receivedProduct[$a]['total_stockin'];
            $product_price_stock_out = $receivedProduct[$a]['total_stockout'];
            $receiving_supply_defective_product_qty = $receivedProduct[$a]['total_defective'];

            $totalStockIn = (float)$product_price_stock_in - (float)$receiving_supply_defective_product_qty;
            $totalAvailbaleStock = (float)$totalStockIn - (float)$product_price_stock_out;

            $salesList->product_price_aid = $receivedProduct[$a]['product_price_aid'];
            $salesList->product_price_available_stock = (float)$totalAvailbaleStock;

            checkUpdateProductPriceAvailableStock($salesList);
        }
    }

    $totalSalesAmount = $data["totalSalesAmount"];
    $salesList->sales_list_price = $data["sales_list_price"];

    $amount = (float)$salesList->sales_list_price * (float)$salesList->sales_list_quantity;
    $amountOld = (float)$salesList->sales_list_price * (float)$sales_list_quantity_old;

    $salesList->sales_aid = $data["sales_list_sales_id"];
    $salesList->sales_total_amount = (float)$totalSalesAmount + (float)$amount - (float)$amountOld;


    checkUpdateTotalAmount($salesList);
    returnSuccess($salesList, "udpate quantity", $query);
}

http_response_code(200);
checkAccess();
