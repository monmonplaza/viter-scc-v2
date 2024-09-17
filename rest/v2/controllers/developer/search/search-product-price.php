<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/search/Search.php';

$conn = null;
$conn = checkDbConnection();

$searchProduct = new Search($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $searchProduct->search = $data["search"];    // get data 
    $query = checkSearchProductPrice($searchProduct);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
