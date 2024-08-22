<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developer/settings/Users.php';
$conn = null;
$conn = checkDbConnection();
$users = new Users($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("usersid", $_GET)) {

        checkPayload($data);
        $users->users_aid = $_GET['usersid'];
        $users->users_is_active = trim($data["isActive"]);
        checkId($users->users_aid);
        $query = checkActive($users);
        http_response_code(200);
        returnSuccess($users, "users", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
