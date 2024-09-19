<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/search/Search.php';

$conn = null;
$conn = checkDbConnection();

$searchProduct = new Search($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $searchProduct->search = $data["search"];    // get data 
    $searchProduct->sales_list_sales_id = checkIndex($data, "sales_list_sales_id");    // get data 
    $query = checkSearchSalesListProduct($searchProduct);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
checkAccess();
