<?php
$conn = null;
$conn = checkDbConnection();
$salesList = new SalesList($conn);
$error = [];
$returnData = [];
if (array_key_exists("saleslistid", $_GET)) {
    checkPayload($data);

    $salesList->sales_list_aid = $_GET['saleslistid'];
    checkId($salesList->sales_list_aid);

    $query = checkDelete($salesList);

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

    $salesList->sales_aid = $data['sales_aid'];
    $salesList->sales_total_amount = (float)$data["totalAmount"] - (float)$data['amount'];

    checkUpdateTotalAmount($salesList);
    returnSuccess($salesList, "Sales List", $query);
}

checkEndpoint();
