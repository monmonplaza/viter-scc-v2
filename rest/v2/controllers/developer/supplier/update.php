<?php
$conn = null;
$conn = checkDbConnection();
$supplier = new Supplier($conn);
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {
    checkPayload($data);

    $supplier->supplier_aid = $_GET['supplierid'];
    $supplier->supplier_name = checkIndex($data, "supplier_name");
    $supplier->supplier_representative = checkIndex($data, "supplier_representative");
    $supplier->supplier_representative_phone = checkIndex($data, "supplier_representative_phone");
    $supplier->supplier_phone = checkIndex($data, "supplier_phone");
    $supplier->supplier_address = checkIndex($data, "supplier_address");
    $supplier->supplier_email = checkIndex($data, "supplier_email");

    $supplier->supplier_is_active = 1;
    $supplier->supplier_datetime = date("Y-m-d H:i:s");
    $supplier_name_old = strtolower($data["supplier_name_old"]);

    checkId($supplier->supplier_aid);

    compareName($supplier, $supplier_name_old, $supplier->supplier_name);


    $query = checkUpdate($supplier);
    returnSuccess($supplier, "supplier", $query);
}

checkEndpoint();
