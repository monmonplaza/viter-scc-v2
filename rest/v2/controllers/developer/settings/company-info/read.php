<?php
$conn = null;
$conn = checkDbConnection();
$info = new CompanyInfo($conn);
$error = [];
$returnData = [];
if (array_key_exists("companyinfoid", $_GET)) {
    $info->company_info_aid = $_GET['companyinfoid'];
    checkId($info->company_info_aid);
    $query = checkReadById($info);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($info);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
