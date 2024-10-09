<?php
$conn = null;
$conn = checkDbConnection();
$pettyCash = new PettyCash($conn);
$error = [];
$returnData = [];
if (array_key_exists("pettycashid", $_GET)) {
    checkPayload($data);

    $pettyCash->petty_cash_aid = $_GET['pettycashid'];
    $pettyCash->petty_cash_date = checkIndex($data, "petty_cash_date");
    $pettyCash->petty_cash_in = $data["petty_cash_in"];
    $pettyCash->petty_cash_out = $data["petty_cash_out"];
    $pettyCash->petty_cash_updated = date("Y-m-d H:i:s");

    checkId($pettyCash->petty_cash_aid);

    $query = checkUpdate($pettyCash);
    returnSuccess($pettyCash, "petty cash", $query);
}

checkEndpoint();
