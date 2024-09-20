<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/purchase/Purchase.php';
$conn = null;
$conn = checkDbConnection();
$purchase = new purchase($conn);

$response = new Response();
$returnData = [];

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);

    $purchase->purchase_reference_no = $data["purchase_reference_no"];

    if (intval($purchase->purchase_reference_no) === 0) {
        $query = checkReadAllNewData($purchase);
        http_response_code(200);
        $reference_no = 0;

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();

        if ($query->rowCount() > 0) {
            $reference_no = $returnData["data"][0]['purchase_reference_no'];
        }

        $returnData["purchase_reference_no"] = $reference_no;
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }

    $query = checkReadAllByReferenceNo($purchase);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
checkAccess();
