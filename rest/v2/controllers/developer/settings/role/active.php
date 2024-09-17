<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/Role.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
$response = new Response();
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("roleid", $_GET)) {
        // check data
        checkPayload($data);

        $role->role_aid = $_GET['roleid'];
        $role->role_is_active = trim($data["isActive"]);
        $role->role_datetime = date("Y-m-d H:i:s");

        checkId($role->role_aid);
        $query = checkActive($role);
        http_response_code(200);
        returnSuccess($role, "Role", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
