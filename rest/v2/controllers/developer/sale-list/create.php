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


$salesList->sales_new_data = 1;
if ($salesList->sales_payment_method === "creadit") {
    $salesList->sales_is_paid = 0;
} else {
    $salesList->sales_is_paid = 1;
}

$salesList->sales_reference_no = substr($salesList->lastInsertedId . $salesList->sales_list_product_id . rand(0, 9999), 0, 9);

$salesList->sales_list_sales_id = 0;

$isNewData = getResultData($salesList->checkGetSalesLastAid());
if (count($isNewData) == 0) {
    checkCreateSales($salesList);
    $salesList->sales_list_sales_id = $salesList->lastInsertedId;
} else {
    $salesList->sales_list_sales_id = checkIndex($isNewData[0], "sales_aid");
    checkUpdateSales($salesList);
    checkUpdateSalesListCustomer($salesList);
}

$query = checkCreate($salesList);

// $salesList->sales_total_amount

// updateSalesTotal($salesList);

returnSuccess($salesList, "Sales List", $query);
