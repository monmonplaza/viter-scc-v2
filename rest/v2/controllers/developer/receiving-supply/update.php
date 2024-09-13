 
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

    $receiving_supply->receiving_supply_defective_remarks = $data["receiving_supply_defective_remarks"];
    $receiving_supply->receiving_supply_defective_product_qty = intval($data["receiving_supply_defective_product_qty"]);
    $receiving_supply->defective_product_amount = $data["defective_product_amount"];

    $receiving_supply->inventory_log_product_id = checkIndex($data, "receiving_supply_product_id");
    $receiving_supply->inventory_log_updated = date("Y-m-d H:i:s");

    if ($receiving_supply->receiving_supply_barcode != "") {
        isBarcodeExist($receiving_supply, $receiving_supply->receiving_supply_barcode, $receiving_supply->receiving_supply_product_id);
    }

    // CREATE UPDATE DEFECTIVE
    if (intval($receiving_supply->receiving_supply_defective_product_qty) != 0) {

        $isDefectiveExist = getResultData($receiving_supply->checkDefectiveById());
        if (count($isDefectiveExist) == 0) {
            checkCreateDefective($receiving_supply);
        } else {
            $receiving_supply->defective_product_aid = checkIndex($isDefectiveExist[0], "defective_product_aid");
            checkUpdateDefective($receiving_supply);
        }
        // FOR INVETORY ONLY
        // DEFECTIVE 
        $updateInventoryLog = getResultData($receiving_supply->checkDefectiveProductTotalQty());
        if (count($updateInventoryLog) > 0) {

            $receiving_supply->inventory_log_defective_product = checkIndex($updateInventoryLog[0], "total_defective_product_qty");
            checkUpdateInventoryDefectiveProduct($receiving_supply);
        }
    }


    checkUpdateReceiving($receiving_supply);
    $query = checkUpdate($receiving_supply);

    // FOR INVETORY ONLY
    // STOCK IN

    $updateInventoryLog = getResultData($receiving_supply->checkProductTotalQty());
    if (count($updateInventoryLog) > 0) {

        $receiving_supply->inventory_log_stock_in = checkIndex($updateInventoryLog[0], "total_product_stock_qty");
        checkUpdateInventoryStockIn($receiving_supply);
    }

    returnSuccess($receiving_supply, "receiving_supply", $query);
}

checkEndpoint();
