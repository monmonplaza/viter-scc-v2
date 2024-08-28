<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving/Receiving.php';
$conn = null;
$conn = checkDbConnection();
$receiving = new Receiving($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $receiving->receiving_start = $_GET['start'];
        $receiving->receiving_total = 50;
        checkLimitId($receiving->receiving_start, $receiving->receiving_total);

        checkUpdateAllNewData($receiving);

        $query = checkReadLimit($receiving);
        $total_result = checkReadAll($receiving);

        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $receiving->receiving_total,
            $receiving->receiving_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
