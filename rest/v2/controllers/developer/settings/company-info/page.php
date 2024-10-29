<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require 'functions.php';
require '../../../../models/developer/settings/Unit.php';
$conn = null;
$conn = checkDbConnection();
$info = new CompanyInfo($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $info->company_info_start = $_GET['start'];
        $info->company_info_total = 50;
        checkLimitId($info->company_info_start, $info->company_info_total);
        $query = checkReadLimit($info);
        $total_result = checkReadAll($info);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $info->company_info_total,
            $info->company_info_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
