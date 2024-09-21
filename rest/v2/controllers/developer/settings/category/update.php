<?php
$conn = null;
$conn = checkDbConnection();
$category = new Category($conn);
$error = [];
$returnData = [];
if (array_key_exists("categoryid", $_GET)) {
    checkPayload($data);

    $category->category_aid = $_GET['categoryid'];
    $category->category_name = checkIndex($data, "category_name");
    $category->category_description = checkIndex($data, "category_description");

    $category->category_is_active = 1;
    $category->category_datetime = date("Y-m-d H:i:s");
    $category_name_old = strtolower($data["category_name_old"]);

    checkId($category->category_aid);

    compareName($category, $category_name_old, $category->category_name);


    $query = checkUpdate($category);
    returnSuccess($category, "category", $query);
}

checkEndpoint();
