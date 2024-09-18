 
<?php
$conn = null;
$conn = checkDbConnection();

$salesList = new SalesList($conn);

if (array_key_exists("saleslistid", $_GET)) {
    checkPayload($data);

    $salesList->sales_list_aid = $_GET['saleslistid'];
    $salesList->sales_list_quantity = checkIndex($data, "sales_list_quantity");
    $salesList->sales_list_updated = date("Y-m-d H:i:s");

    $query = checkUpdate($salesList);


    returnSuccess($salesList, "receiving_supply", $query);
}

checkEndpoint();
