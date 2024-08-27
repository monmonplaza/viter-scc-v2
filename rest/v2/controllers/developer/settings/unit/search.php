<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require 'functions.php';
require '../../../../models/developer/settings/Unit.php';

$conn = null;
$conn = checkDbConnection();

$unit = new Unit($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $unit->settings_unit_search = $data["searchValue"];    // get data

    if ($data["isFilter"] == true) {
        if ($unit->settings_unit_search != "") {

            checkKeyword($unit->settings_unit_search);
            $unit->settings_unit_is_active = checkIndex($data, "settings_unit_is_active");
            $query = checkFilterByStatusAndSearch($unit);
            http_response_code(200);
            getQueriedData($query);
        }

        $unit->settings_unit_is_active = checkIndex($data, "settings_unit_is_active");
        $query = checkFilterByStatus($unit);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($unit->settings_unit_search);
    $query = checkSearch($unit);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
