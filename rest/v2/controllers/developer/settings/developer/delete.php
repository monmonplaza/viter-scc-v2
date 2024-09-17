<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);

if (array_key_exists("developerid", $_GET)) {
    $developer->developer_aid = $_GET['developerid'];

    checkId($developer->developer_aid);
    // delete
    $query = checkDelete($developer);
    returnSuccess($developer, "User", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
