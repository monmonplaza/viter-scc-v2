<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);

if (array_key_exists("roleid", $_GET)) {
    // check data
    checkPayload($data);
    $role->role_aid = $_GET['roleid'];
    $column_name = strtolower(str_replace(" ", "_", $data['item']));
    checkId($role->role_aid);
    // delete
    // if ($column_name == "developer") {
    //     isUserSystemAssociated($role);
    // } else {
    //     isUserOtherAssociated($role);
    // }
    checkDropColumnName($role, $column_name);
    $query = checkDelete($role);

    returnSuccess($role, "Role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
