<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving-supply/ReceivingSupply.php';

$conn = null;
$conn = checkDbConnection();
$receivingSupply = new ReceivingSupply($conn);
$response = new Response();
$body = file_get_contents("php://input");
$data = json_decode($body, true);
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    checkPayload($data);

    $receivingSupply->receiving_supply_received_id = $data['receiving_supply_received_id'];
    if (intval($receivingSupply->receiving_supply_received_id) != 0) {

        $amountTotal = 0;

        $totalAmountById = getResultData($receivingSupply->checkGetTotalAmountById());
        if (count($totalAmountById) > 0 && $totalAmountById) {
            $amountTotal = intval($totalAmountById[0]['amount']);
        }

        $query = checkReadAllNewReceiveSupplyById($receivingSupply);
        http_response_code(200);
        $response = new Response();
        $returnData = [];
        $returnData["amount"] = $amountTotal;
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    } else {

        $amountTotal = 0;

        $totalAmountByNewdata = getResultData($receivingSupply->checkGetTotalAmountByNewData());

        if (count($totalAmountByNewdata) > 0 && $totalAmountByNewdata) {
            $amountTotal = intval($totalAmountByNewdata[0]['amount']);
        }

        $query = checkReadAllNewReceiveSupply($receivingSupply);
        http_response_code(200);
        $response = new Response();
        $returnData = [];
        $returnData["amount"] = $amountTotal;
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    checkEndpoint();
}

http_response_code(200);
checkAccess();
