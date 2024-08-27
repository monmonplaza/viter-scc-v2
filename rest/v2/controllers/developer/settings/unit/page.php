<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require 'functions.php';
require '../../../../models/developer/settings/Unit.php';
$conn = null;
$conn = checkDbConnection();
$unit = new Unit($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $unit->settings_unit_start = $_GET['start'];
        $unit->settings_unit_total = 50;
        checkLimitId($unit->settings_unit_start, $unit->settings_unit_total);
        $query = checkReadLimit($unit);
        $total_result = checkReadAll($unit);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $unit->settings_unit_total,
            $unit->settings_unit_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
