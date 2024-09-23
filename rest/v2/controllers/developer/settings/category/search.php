<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/Category.php';

$conn = null;
$conn = checkDbConnection();

$category = new Category($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $category->category_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($category->category_search != "") {

            checkKeyword($category->category_search);
            $category->category_is_active = checkIndex($data, "category_is_active");
            $query = checkFilterByStatusAndSearch($category);
            http_response_code(200);
            getQueriedData($query);
        }


        $category->category_is_active = checkIndex($data, "category_is_active");
        $query = checkFilterByStatus($category);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($category->category_search);
    $query = checkSearch($category);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
