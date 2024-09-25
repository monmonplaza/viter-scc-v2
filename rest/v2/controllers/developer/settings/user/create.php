<?php
// use notification template
require '../../../../notification/verify-account.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("userid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$user->user_fname = trim($data["user_fname"]);
$user->user_lname = trim($data["user_lname"]);
$user->user_email = trim($data["user_email"]);
$user->user_role_id = trim($data["user_role_id"]);
$user->user_key = $encrypt->doHash(rand());
$user->user_is_active = 1;
$user->user_created = date("Y-m-d H:i:s");
$user->user_datetime = date("Y-m-d H:i:s");
$password_link = "/create-password";
// check email
isEmailExist($user, $user->user_email);
$query = checkCreate($user);
if ($query->rowCount() > 0) {
    sendEmail(
        $password_link,
        $user->user_fname,
        $user->user_email,
        $user->user_key
    );
}

// create
if ($mailData["mail_success"] == true) {
    returnSuccess($developer, "User", $query);
}

returnError($mailData["error"]);
