<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developer/settings/User.php';
require 'functions.php';
$conn = null;
$conn = checkDbConnection();

$user = new User($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $user->user_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($user->user_search != "") {

            checkKeyword($user->user_search);
            $user->user_is_active = checkIndex($data, "user_is_active");
            $query = checkFilterByStatusAndSearch($user);
            http_response_code(200);
            getQueriedData($query);
        }


        $user->user_is_active = checkIndex($data, "user_is_active");
        $query = checkFilterByStatus($user);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($user->user_search);
    $query = checkSearch($user);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
