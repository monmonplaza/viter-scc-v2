<?php
$conn = null;
$conn = checkDbConnection();
$unit = new Unit($conn);
$error = [];
$returnData = [];
if (array_key_exists("unitid", $_GET)) {
    $unit->settings_unit_aid = $_GET['unitid'];
    checkId($unit->settings_unit_aid);
    $query = checkReadById($unit);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($unit);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
