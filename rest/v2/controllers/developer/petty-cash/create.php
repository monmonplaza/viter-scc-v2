<?php
$conn = null;
$conn = checkDbConnection();

$pettyCash = new PettyCash($conn);

if (array_key_exists("pettycashid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$pettyCash->petty_cash_date = checkIndex($data, "petty_cash_date");
$pettyCash->petty_cash_in = $data["petty_cash_in"];
$pettyCash->petty_cash_out = $data["petty_cash_out"];
$pettyCash->petty_cash_last_insert = 1;
$pettyCash->petty_cash_created = date("Y-m-d H:i:s");
$pettyCash->petty_cash_updated = date("Y-m-d H:i:s");


checkActive($pettyCash);



$query = checkCreate($pettyCash);

$pettyCash->petty_cash_reference_no = substr($pettyCash->lastInsertedId . date("i") . date("m") . date("d") . date("H") . rand(10, 9999), 0, 9);
$pettyCash->petty_cash_total = 0;
$cash_in = 0;
$cash_out = 0;


$totaPettyCash = getResultData($pettyCash->readTotalPettyCash());
if (count($totaPettyCash) > 0) {
    for ($a = 0; $a < count($totaPettyCash); $a++) {
        $cash_in += $totaPettyCash[$a]["cash_in"];
        $cash_out += $totaPettyCash[$a]["cash_out"];
    }
    $total = (float)$cash_in - (float)$cash_out;
    $pettyCash->petty_cash_total = $total;
} else {
    $pettyCash->petty_cash_total = $pettyCash->petty_cash_in;
}

checkUpdateTotalAndReference($pettyCash);
returnSuccess($pettyCash, "petty cash", $query);
