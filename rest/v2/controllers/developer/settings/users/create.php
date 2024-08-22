<?php
$conn = null;
$conn = checkDbConnection();

$users = new Users($conn);

if (array_key_exists("usersid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$users->users_name = checkIndex($data, "users_name");
$users->users_email = checkIndex($data, "users_email");

$users->users_is_active = 1;
$users->users_created = date("Y-m-d H:i:s");
$users->users_datetime = date("Y-m-d H:i:s");


    isEmailExist($users, $users->users_email);

$query = checkCreate($users);
returnSuccess($users, "users", $query);
