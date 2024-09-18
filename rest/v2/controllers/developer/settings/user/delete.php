<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);

if (array_key_exists("userid", $_GET)) {
    $user->user_aid = $_GET['userid'];

    checkId($user->user_aid);
    // delete
    $query = checkDelete($user);
    returnSuccess($user, "User", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
