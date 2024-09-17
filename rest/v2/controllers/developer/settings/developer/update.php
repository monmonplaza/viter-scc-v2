<?php
// use notification template
require '../../../../notification/verify-email.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);
$encrypt = new Encryption();

if (array_key_exists("developerid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $developer->developer_aid = $_GET['developerid'];
    $developer->developer_fname = trim($data["developer_fname"]);
    $developer->developer_lname = trim($data["developer_lname"]);
    $developer->developer_email = trim($data["developer_email"]);
    $developer->developer_datetime = date("Y-m-d H:i:s");
    $developer_email_old = strtolower($data["developer_email_old"]);
    $developer->developer_key = $encrypt->doHash(rand());
    $link = "/developer/verify-email";

    checkId($developer->developer_aid);
    // check name
    compareEmail($developer, $developer_email_old, $developer->developer_email);
    // update
    if ($developer->developer_email != $developer_email_old) {
        checkUpdateUserKeyAndNewEmail($developer);
        sendEmailVerify(
            $link,
            $developer->developer_fname,
            $developer_email_old,
            $developer->developer_email,
            $developer->developer_key
        );
    }
    $query = checkUpdate($developer);
    returnSuccess($developer, "User", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
