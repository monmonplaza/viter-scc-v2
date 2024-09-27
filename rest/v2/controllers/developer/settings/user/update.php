<?php
// use notification template
require '../../../../notification/verify-email.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$encrypt = new Encryption();

if (array_key_exists("userid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $user->user_aid = $_GET['userid'];
    $user->user_fname = trim($data["user_fname"]);
    $user->user_lname = trim($data["user_lname"]);
    $user->user_email = trim($data["user_email"]);
    $user->user_role_id = trim($data["user_role_id"]);
    $user->user_datetime = date("Y-m-d H:i:s");
    $user_email_old = strtolower($data["user_email_old"]);
    $user->user_key = $encrypt->doHash(rand());
    $link = "/verify-email";

    checkId($user->user_aid);
    // check name
    compareEmail($user, $user_email_old, $user->user_email);
    // update
    if ($user->user_email != $user_email_old) {
        checkUpdateUserKeyAndNewEmail($user);
        sendEmailVerify(
            $link,
            $user->user_fname,
            $user_email_old,
            $user->user_email,
            $user->user_key
        );
    }
    $query = checkUpdate($user);
    returnSuccess($user, "User", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
