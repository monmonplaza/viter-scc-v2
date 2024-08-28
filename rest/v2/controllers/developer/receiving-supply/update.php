 
<?php
$conn = null;
$conn = checkDbConnection();

$receiving_supply = new ReceivingSupply($conn);

if (array_key_exists("receivingsupplyid", $_GET)) {
    checkPayload($data);

    $receiving_supply->receiving_supply_aid = $_GET['receivingsupplyid'];
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

    $receiving_supply->receiving_aid = checkIndex($data, "receiving_supply_received_id");
    $receiving_supply->receiving_date = checkIndex($data, "receiving_date");
    $receiving_supply->receiving_is_complete = 0;
    $receiving_supply->receiving_datetime = date("Y-m-d H:i:s");

    $receiving_supply->receiving_total_amount = (float)$data["receiving_total_amount"]  + (float)$receiving_supply->receiving_supply_amount;

    if ($receiving_supply->receiving_supply_barcode != "") {
        isBarcodeExist($receiving_supply, $receiving_supply->receiving_supply_barcode, $receiving_supply->receiving_supply_product_id);
    }

    checkUpdateReceiving($receiving_supply);

    $query = checkUpdate($receiving_supply);
    returnSuccess($receiving_supply, "receiving_supply", $query);
}

checkEndpoint();
