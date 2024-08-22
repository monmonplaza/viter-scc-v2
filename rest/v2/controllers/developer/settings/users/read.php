<?php
$conn = null;
$conn = checkDbConnection();
$users = new Users($conn);
$error = [];
$returnData = [];
if (array_key_exists("usersid", $_GET)) {
    $users->users_aid = $_GET['usersid'];
    checkId($users->users_aid);
    $query = checkReadById($users);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($users);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
