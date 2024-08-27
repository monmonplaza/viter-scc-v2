<?php
$conn = null;
$conn = checkDbConnection();
$unit = new Unit($conn);
$error = [];
$returnData = [];
if (array_key_exists("unitid", $_GET)) {
    checkPayload($data);

    $unit->settings_unit_aid = $_GET['unitid'];
    $unit->settings_unit_name = checkIndex($data, "settings_unit_name");
    $unit->settings_unit_updated = date("Y-m-d H:i:s");
    $settings_unit_name_old = strtolower($data["settings_unit_name_old"]);

    checkId($unit->settings_unit_aid);

    compareName($unit, $settings_unit_name_old, $unit->settings_unit_name);

    $query = checkUpdate($unit);
    returnSuccess($unit, "unit", $query);
}

checkEndpoint();
