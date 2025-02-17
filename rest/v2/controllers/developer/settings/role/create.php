<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get should not be present
if (array_key_exists("roleid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);

$role->role_name = trim($data["role_name"]);
$role->role_description = trim($data["role_description"]);
$role->role_is_active = 1;
$role->role_created = date("Y-m-d H:i:s");
$role->role_datetime = date("Y-m-d H:i:s");

$column_name = strtolower(str_replace(" ", "_", $data["role_name"]));

// check name
isNameExist($role, $role->role_name);

// create
$query = checkCreate($role);

// add column
checkAddColumn($role, $column_name);

// update column value after adding
checkUpdateColumnValue($role, $column_name);

returnSuccess($role, "Role", $query);
