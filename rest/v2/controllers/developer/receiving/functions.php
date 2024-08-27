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
