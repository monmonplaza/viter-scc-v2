<?php
$conn = null;
$conn = checkDbConnection();
$role = new Role($conn);

if (array_key_exists("roleid", $_GET)) {
    // check data
    checkPayload($data);

    $role->role_aid = $_GET['roleid'];
    $role->role_description = trim($data["role_description"]);
    $role->role_datetime = date("Y-m-d H:i:s");
    checkId($role->role_aid);
    $query = checkUpdate($role);
    returnSuccess($role, "Role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
