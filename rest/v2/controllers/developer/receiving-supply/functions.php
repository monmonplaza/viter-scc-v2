<?php

// Create receiving
function checkCreateReceiving($object)
{
    $query = $object->createReceiving();
    checkQuery($query, "There's a problem processing your request. (create receiving)");
    return $query;
}

// Read all
function checkReadAllNewReceiveSupply($object)
{
    $query = $object->readAllNewReceiveSupply();
    checkQuery($query, "Empty records. (read all new receive supply)");
    return $query;
}

// Read all
function checkReadAllNewReceiveSupplyById($object)
{
    $query = $object->readAllNewReceiveSupplyById();
    checkQuery($query, "Empty records. (read all new receive supply by id)");
    return $query;
}

// Update receiving supply
function checkUpdateReceiving($object)
{
    $query = $object->updateReceiving();
    checkQuery($query, "There's a problem processing your request. (update receiving)");
    return $query;
}

// Update receiving reference no.
function checkUpdateReferenceNumber($object)
{
    $query = $object->updateReferenceNumber();
    checkQuery($query, "There's a problem processing your request. (update receiving reference no.)");
    return $query;
}

// check date
function isDateExist($object, $date)
{

    $nDate = date_create($date);
    $formatedDate = date_format($nDate, "F d, Y");

    $query = $object->checkDate();
    $count = $query->rowCount();
    checkExistence($count, "{$formatedDate} already exist.");
}

// check barcode
function isBarcodeExist($object, $barcode, $productId)
{
    $query = $object->checkBarcode();
    $count = $query->rowCount();

    if ($count > 0) {
        $row = $query->fetchAll();
        extract($row);
        for ($i = 0; $i < count($row); $i++) {
            // if dont have s corp in any client 
            if (
                intval($row[0]['receiving_supply_product_id']) != intval($productId)
            ) {

                checkExistence($count, "Barcode({$barcode}) already exist.");
            }
        }
    }
}
