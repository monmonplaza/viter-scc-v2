<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/sales/Sales.php';
$conn = null;
$conn = checkDbConnection();
$sales = new Sales($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $sales->sales_start = $_GET['start'];
        $sales->sales_total = 50;
        checkLimitId($sales->sales_start, $sales->sales_total);

        $query = checkReadLimit($sales);
        $total_result = checkReadAll($sales);

        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $sales->sales_total,
            $sales->sales_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
