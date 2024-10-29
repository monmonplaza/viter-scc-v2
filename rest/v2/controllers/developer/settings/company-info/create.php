<?php
$conn = null;
$conn = checkDbConnection();

$info = new CompanyInfo($conn);

if (array_key_exists("companyinfoid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);


$info->company_info_name = checkIndex($data, "company_info_name");
$info->company_info_email = checkIndex($data, "company_info_email");
$info->company_info_phone = checkIndex($data, "company_info_phone");
$info->company_info_mobile = checkIndex($data, "company_info_mobile");
$info->company_info_address = checkIndex($data, "company_info_address");
$info->company_info_color_accent = checkIndex($data, "company_info_color_accent");
$info->company_info_color_secondary = checkIndex($data, "company_info_color_secondary");
$info->company_info_logo = $data["company_info_logo"];

$info->company_info_created = date("Y-m-d H:i:s");
$info->company_info_updated = date("Y-m-d H:i:s");

isNameExist($info, $info->company_info_name);

$query = checkCreate($info);
returnSuccess($info, "company info", $query);
