<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/category/Category.php';
$conn = null;
$conn = checkDbConnection();
$category = new Category($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $category->category_start = $_GET['start'];
        $category->category_total = 50;
        checkLimitId($category->category_start, $category->category_total);
        $query = checkReadLimit($category);
        $total_result = checkReadAll($category);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $category->category_total,
            $category->category_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
