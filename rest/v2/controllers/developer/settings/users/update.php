<?php
$conn = null;
$conn = checkDbConnection();
$users = new Users($conn);
$error = [];
$returnData = [];
if (array_key_exists("usersid", $_GET)) {
    checkPayload($data);

    $users->users_aid   = $_GET['usersid'];
    $users->users_name = checkIndex($data, "users_name");
    $users->users_email = checkIndex($data, "users_email");

    $users->users_is_active = 1;
    $users->users_datetime = date("Y-m-d H:i:s");
    $users_name_old = strtolower($data["users_name_old"]);

    checkId($users->users_aid);


    $query = checkUpdate($users);
    returnSuccess($users, "users", $query);
}

checkEndpoint();
