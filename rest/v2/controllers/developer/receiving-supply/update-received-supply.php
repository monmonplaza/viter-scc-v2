 
<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require 'functions.php';
require '../../../models/developer/receiving-supply/ReceivingSupply.php';


$conn = null;
$conn = checkDbConnection();

$receiving_supply = new ReceivingSupply($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();


    if (array_key_exists("receivingsupplyid", $_GET)) {
        checkPayload($data);

        $receiving_supply->receiving_aid = $_GET['receivingsupplyid'];
        $receiving_supply->receiving_date = checkIndex($data, "receiving_date");
        $receiving_supply->receiving_supply_product_id = checkIndex($data, "receiving_supply_product_id");
        $receiving_supply->receiving_supply_supplier_id = checkIndex($data, "receiving_supply_supplier_id");
        $receiving_supply->receiving_supply_unit_id = checkIndex($data, "receiving_supply_unit_id");
        $receiving_supply->receiving_supply_quantity = checkIndex($data, "receiving_supply_quantity");
        $receiving_supply->receiving_supply_price = checkIndex($data, "receiving_supply_price");
        $receiving_supply->receiving_supply_amount = checkIndex($data, "receiving_supply_amount");
        $receiving_supply->receiving_supply_expiration_date = $data["receiving_supply_expiration_date"];
        $receiving_supply->receiving_supply_barcode = $data["receiving_supply_barcode"];
        $receiving_supply->receiving_supply_is_active = 1;
        $receiving_supply->receiving_supply_created = date("Y-m-d H:i:s");
        $receiving_supply->receiving_supply_datetime = date("Y-m-d H:i:s");

        $receiving_supply->receiving_is_complete = 0;
        $receiving_supply->receiving_datetime = date("Y-m-d H:i:s");

        $receiving_supply->receiving_total_amount = (float)$data["receiving_total_amount"]  + (float)$receiving_supply->receiving_supply_amount;

        $receiving_supply->receiving_supply_defective_product_qty = 0;

        if ($receiving_supply->receiving_supply_barcode != "") {
            isBarcodeExist($receiving_supply, $receiving_supply->receiving_supply_barcode, $receiving_supply->receiving_supply_product_id);
        }

        checkUpdateReceiving($receiving_supply);

        $receiving_supply->receiving_is_new_data = 0;
        $receiving_supply->receiving_supply_have_price = 0;


        // if ($receiving_supply->receiving_supply_barcode == "") {
        //     $receiving_supply->receiving_supply_barcode = substr($receiving_supply->receiving_aid . rand(1000, 9999) . $receiving_supply->receiving_supply_product_id . $receiving_supply->receiving_supply_supplier_id, 0, 9);
        // }

        $query = checkCreate($receiving_supply);

        returnSuccess($receiving_supply, "receiving_supply", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
