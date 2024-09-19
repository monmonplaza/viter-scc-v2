<?php

// Update Inventory Log
function checkUpdateInventoryReturnProduct($object)
{
    $query = $object->updateInventoryReturnProduct();
    checkQuery($query, "There's a problem processing your request. (update Inventory Return Product)");
    return $query;
}

// Update Inventory Log
function checkUpdatePurchaseDate($object)
{
    $query = $object->updatePurchaseDate();
    checkQuery($query, "There's a problem processing your request. (update purchase date)");
    return $query;
}

// Read all unit
function checkFilterByDate($object)
{
    $query = $object->filterByDate();
    checkQuery($query, "Empty records. (filter by date)");
    return $query;
}

// Read all
function checkReadGroupByReferenceNo($object)
{
    $query = $object->readGroupByReferenceNo();
    checkQuery($query, "Empty records. (read group by reference no)");
    return $query;
}

// Read limit
function checkReadGroupByReferenceNoLimit($object)
{
    $query = $object->readGroupByReferenceNoLimit();
    checkQuery($query, "Empty records. (read group by reference no limit)");
    return $query;
}

// Read all
function checkReadAllNewData($object)
{
    $query = $object->readAllNewData();
    checkQuery($query, "Empty records. (read All New Data)");
    return $query;
}

// Read all
function checkReadAllByReferenceNo($object)
{
    $query = $object->readAllByReferenceNo();
    checkQuery($query, "Empty records. (read All By Reference No)");
    return $query;
}
