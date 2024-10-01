<?php
// set http header
require '../../../../core/header.php';
require '../../../../core/Encryption.php';
// use needed functions
require '../../../../core/functions.php';
// use notification template
require '../../../../notification/reset-password.php';
// use needed classes
require '../../../../models/developer/settings/Developer.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    $developer->developer_key = $encrypt->doHash(rand());
    $developer->developer_datetime = date("Y-m-d H:i:s");
    $developer->developer_email = trim($data["email"]);
    $password_link = "/developer/create-password";

    $query = $developer->readLogin();
    if ($query->rowCount() == 0) {
        returnError("Invalid email. Please use a registered one.");
    }

    $query = checkResetPassword($developer);
    if ($query->rowCount() > 0) {
        $mailData = sendEmail(
            $password_link,
            $developer->developer_email,
            $developer->developer_key
        );
    }

    if ($mailData["mail_success"] == true) {
        http_response_code(200);
        returnSuccess($developer, "User system", $query);
    }



    http_response_code(200);
    returnSuccess($developer, "User system", $query, $developer->developer_email);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
