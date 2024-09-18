<?php
$conn = null;
$conn = checkDbConnection();

$salesList = new SalesList($conn);

if (array_key_exists("saleslistid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$salesList->sales_list_date = checkIndex($data, "sales_list_date");
$salesList->sales_list_product_id = checkIndex($data, "sales_list_product_id");
$salesList->sales_list_customer_id = checkIndex($data, "sales_list_customer_id");
$salesList->sales_list_quantity = checkIndex($data, "sales_list_quantity");
$salesList->sales_list_price = checkIndex($data, "sales_list_price");
$salesList->sales_list_product_price_id = checkIndex($data, "sales_list_product_price_id");
$salesList->sales_list_created = date("Y-m-d H:i:s");
$salesList->sales_list_updated = date("Y-m-d H:i:s");


$salesList->sales_date = checkIndex($data, "sales_list_date");
$salesList->sales_customer_id = checkIndex($data, "sales_customer_id");
$salesList->sales_payment_method = checkIndex($data, "sales_payment_method");
$salesList->sales_created = date("Y-m-d H:i:s");
$salesList->sales_updated = date("Y-m-d H:i:s");

if ($salesList->sales_payment_method == "credit") {
    $salesList->sales_is_paid = 0;
} else {
    $salesList->sales_is_paid = 1;
}

$salesList->sales_reference_no = substr($salesList->sales_list_customer_id . rand(0, 9) . $salesList->sales_list_product_id . rand(0, 9999), 0, 9);

$salesList->sales_list_sales_id = intval($data["sales_aid"]);
$isUpdate = $data["isUpdate"];

if ($isUpdate == false) {
    $isNewData = getResultData($salesList->checkGetSalesLastAid());
    if (count($isNewData) == 0) {
        $salesList->sales_new_data = 1;
        checkCreateSales($salesList);
        $salesList->sales_list_sales_id = $salesList->lastInsertedId;
    } else {
        $salesList->sales_list_sales_id = checkIndex($isNewData[0], "sales_aid");
        checkUpdateSales($salesList);
        checkUpdateSalesListCustomer($salesList);
    }
}

$query = checkCreate($salesList);

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


returnSuccess($salesList, "Sales List", $query);
