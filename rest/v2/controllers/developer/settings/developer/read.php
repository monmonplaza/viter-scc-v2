<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$developer = new Developer($conn);
// get $_GET data
// check if developerid is in the url e.g. /user/1
$error = [];
$returnData = [];
if (array_key_exists("developerid", $_GET)) {
    // get task id from query string
    $developer->developer_aid = $_GET['developerid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($developer->developer_aid);
    $query = checkReadById($developer);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /user
if (empty($_GET)) {
    $query = checkReadAll($developer);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
