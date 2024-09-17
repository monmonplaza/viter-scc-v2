<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/Developer.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        $developer->developer_start = $_GET['start'];
        $developer->developer_total = 10;

        checkLimitId($developer->developer_start, $developer->developer_total);
        $query = checkReadLimit($developer);
        $total_result = checkReadAll($developer);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $developer->developer_total,
            $developer->developer_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
