<?php
$conn = null;
$conn = checkDbConnection();
$info = new CompanyInfo($conn);
$error = [];
$returnData = [];
if (array_key_exists("companyinfoid", $_GET)) {
    $info->company_info_aid = $_GET['companyinfoid'];
    checkId($info->company_info_aid);
    // isAssociated($info);
    $query = checkDelete($info);
    returnSuccess($info, "company info", $query);
}

checkEndpoint();
