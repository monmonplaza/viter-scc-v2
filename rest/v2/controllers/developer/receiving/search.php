<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving/Receiving.php';

$conn = null;
$conn = checkDbConnection();

$receiving = new Receiving($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $receiving->receiving_search = $data["searchValue"];    // get data


    if ($data["isFilter"] == true) {
        $receiving->receiving_date = checkIndex($data, "filterDate");
        $query = checkFilterByDate($receiving);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($receiving->receiving_search);
    $query = checkSearch($receiving);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
