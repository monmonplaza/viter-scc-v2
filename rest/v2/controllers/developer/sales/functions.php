<?php


// Read all
function checkReadAllSupplier($object)
{
    $query = $object->readAllSupplier();
    checkQuery($query, "Empty records. (read all supplier)");
    return $query;
}

// Read all
function checkReadAllProduct($object)
{
    $query = $object->readAllProduct();
    checkQuery($query, "Empty records. (read all product)");
    return $query;
}

// Read all unit
function checkReadAllUnit($object)
{
    $query = $object->readAllUnit();
    checkQuery($query, "Empty records. (read all unit)");
    return $query;
}

// Read all unit
function checkFilterByDate($object)
{
    $query = $object->filterByDate();
    checkQuery($query, "Empty records. (filter by date)");
    return $query;
}

// Update receiving reference no.
function checkUpdateAllNewData($object)
{
    $query = $object->updateAllNewData();
    checkQuery($query, "There's a problem processing your request. (update new data in receiving)");
    return $query;
}

// Update Inventory Log
function checkUpdateInventoryStockOut($object)
{
    $query = $object->updateInventoryStockOut();
    checkQuery($query, "There's a problem processing your request. (update Inventory stock in)");
    return $query;
}

// Update Inventory Log
function checkUpdateInventoryDefectiveProduct($object)
{
    $query = $object->updateInventoryDefectiveProduct();
    checkQuery($query, "There's a problem processing your request. (update Inventory Defective product)");
    return $query;
}
