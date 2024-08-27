<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/search/Search.php';

$conn = null;
$conn = checkDbConnection();

$searchSupplier = new Search($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $searchSupplier->search = $data["search"];    // get data

    $query = checkSearchSupplier($searchSupplier);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
