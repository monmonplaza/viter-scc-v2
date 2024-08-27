<?php
$conn = null;
$conn = checkDbConnection();
$unit = new Unit($conn);
$error = [];
$returnData = [];
if (array_key_exists("unitid", $_GET)) {
    $unit->settings_unit_aid = $_GET['unitid'];
    checkId($unit->settings_unit_aid);
    // isAssociated($unit);
    $query = checkDelete($unit);
    returnSuccess($unit, "unit", $query);
}

checkEndpoint();
