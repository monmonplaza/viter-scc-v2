<?php

// set http header
require '../../../core/header.php';
require '../../../core/Encryption.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/developer/account/AccountDeveloper.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$account = new AccountDeveloper($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $account->developer_aid = $data['user_id'];
    $current_password = $data['current_password'];
    $account->developer_password = $encrypt->doPasswordHash($data["new_password"]);
    $account->developer_datetime = date("Y-m-d H:i:s");

    $query = $account->readAccount();

    if ($query->rowCount() == 0) {
        returnError('Invalid account. Please use a registered one.');
    }

    $row = $query->fetch(PDO::FETCH_ASSOC);
    extract($row);

    if (password_verify($current_password, $developer_password)) {
        checkUpdatePassword($account);
        returnSuccess($account, "Password change", $query);
    } else {
        returnError("Incorrect password.");
    }
}

http_response_code(200);
