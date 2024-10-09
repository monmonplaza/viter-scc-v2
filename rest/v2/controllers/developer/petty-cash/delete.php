<?php
$conn = null;
$conn = checkDbConnection();
$pettyCash = new PettyCash($conn);
$error = [];
$returnData = [];
if (array_key_exists("pettycashid", $_GET)) {
    $pettyCash->petty_cash_aid = $_GET['pettycashid'];
    $pettyCash->petty_cash_updated = date("Y-m-d H:i:s");
    checkId($pettyCash->petty_cash_aid);

    $query = checkDelete($pettyCash);

    // update last insert data to last inserted
    $lastId = getResultData($pettyCash->readLastId());
    if (count($lastId) > 0) {
        $pettyCash->petty_cash_aid = $lastId[0]["petty_cash_aid"];
        // Last ID will be last inserted
        checkUpdateLastId($pettyCash);
    }

    // // update total petty cash amount
    // $totaPettyCash = getResultData($pettyCash->readTotalPettyCash());
    // if (count($totaPettyCash) > 0) {
    //     for ($a = 0; $a < count($totaPettyCash); $a++) {
    //         $cash_in += $totaPettyCash[$a]["cash_in"];
    //         $cash_out += $totaPettyCash[$a]["cash_out"];
    //     }
    //     $total = (float)$cash_in - (float)$cash_out;
    //     $pettyCash->petty_cash_total = $total;
    // }

    // checkUpdateTotalPettyCash($pettyCash);
    returnSuccess($pettyCash, "petty cash", $query);
}

checkEndpoint();
