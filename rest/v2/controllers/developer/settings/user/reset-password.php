<?php
// set http header
require '../../../../core/header.php';
require '../../../../core/Encryption.php';
// use needed functions
require '../../../../core/functions.php';
// use notification template
require '../../../../notification/reset-password.php';
// use needed classes
require '../../../../models/developer/settings/User.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    $user->user_key = $encrypt->doHash(rand());
    $user->user_datetime = date("Y-m-d H:i:s");
    $user->user_email = trim($data["email"]);
    $password_link = "/create-password";

    $query = $user->readLogin();
    if ($query->rowCount() == 0) {
        returnError("Invalid email. Please use a registered one.");
    }

    $query = checkResetPassword($user);

    if ($query->rowCount() > 0) {
        $mail = sendEmail(
            $password_link,
            $user->user_email,
            $user->user_key
        );
    }

    if ($mailData["mail_success"] == true) {
        http_response_code(200);
        returnSuccess($developer, "User", $query);
    }

    returnError($mailData["error"]);
    checkEndpoint();
}

checkAccess();
