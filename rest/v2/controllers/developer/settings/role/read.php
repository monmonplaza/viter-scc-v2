<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
$role = new Role($conn);

if (array_key_exists("roleid", $_GET)) {
    $role->role_aid = $_GET['roleid'];
    checkId($role->role_aid);
    $query = checkReadById($role);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($role);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
