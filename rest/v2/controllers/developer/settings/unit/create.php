<?php
$conn = null;
$conn = checkDbConnection();

$unit = new Unit($conn);

if (array_key_exists("unitid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$unit->settings_unit_name = checkIndex($data, "settings_unit_name");
$unit->settings_unit_is_active = 1;
$unit->settings_unit_created = date("Y-m-d H:i:s");
$unit->settings_unit_updated = date("Y-m-d H:i:s");

isNameExist($unit, $unit->settings_unit_name);

$query = checkCreate($unit);
returnSuccess($unit, "unit", $query);
