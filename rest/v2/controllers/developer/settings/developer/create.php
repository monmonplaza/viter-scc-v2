<?php
// use notification template
require '../../../../notification/verify-account.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("developerid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$developer->developer_fname = trim($data["developer_fname"]);
$developer->developer_lname = trim($data["developer_lname"]);
$developer->developer_is_active = 1;
$developer->developer_email = trim($data["developer_email"]);
$developer->developer_role_id = trim($data["developer_role_id"]);
$developer->developer_key = $encrypt->doHash(rand());
$developer->developer_created = date("Y-m-d H:i:s");
$developer->developer_datetime = date("Y-m-d H:i:s");
$password_link = "/developer/create-password";
// check email
isEmailExist($developer, $developer->developer_email);
// send email notification
sendEmail(
    $password_link,
    $developer->developer_fname,
    $developer->developer_email,
    $developer->developer_key
);
// create
$query = checkCreate($developer);
returnSuccess($developer, "User system", $query);
