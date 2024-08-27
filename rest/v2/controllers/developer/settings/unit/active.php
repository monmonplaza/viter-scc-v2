<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require 'functions.php';
require '../../../../models/developer/settings/Unit.php';
$conn = null;
$conn = checkDbConnection();
$unit = new Unit($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("unitid", $_GET)) {

        checkPayload($data);
        $unit->settings_unit_aid = $_GET['unitid'];
        $unit->settings_unit_is_active = trim($data["isActive"]);
        $unit->settings_unit_updated = date("Y-m-d H:i:s");

        checkId($unit->settings_unit_aid);
        $query = checkActive($unit);
        http_response_code(200);
        returnSuccess($unit, "unit", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
