<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/developer/settings/User.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$response = new Response();
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("userkey", $_GET)) {
        // get data
        $user->user_key = $_GET['userkey'];
        $user->user_datetime = date("Y-m-d H:i:s");

        // check if email exist
        $readKey = $user->readKeyChangeEmail();

        // check if reload or key empty 
        $newCount = 0;

        // update if first load
        if ($readKey->rowCount() > 0) {
            $row = $readKey->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $user->user_email = $user_email_new;
            // update
            $query = checkUpdateEmailForUser($user);
            returnSuccess($user, "System user", $query);
        }

        $returnData["count"] = $newCount;
        $returnData["success"] = true;
        $returnData["added"] = $newCount;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
