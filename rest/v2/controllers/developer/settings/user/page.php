<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/User.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        $user->user_start = $_GET['start'];
        $user->user_total = 10;

        checkLimitId($user->user_start, $user->user_total);
        $query = checkReadLimit($user);
        $total_result = checkReadAll($user);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $user->user_total,
            $user->user_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
