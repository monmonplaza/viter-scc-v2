<?php

// Create receiving
function checkCreateSales($object)
{
    $query = $object->createSales();
    checkQuery($query, "There's a problem processing your request. (create sales)");
    return $query;
}

// Update receiving supply
function checkUpdateSales($object)
{
    $query = $object->updateSales();
    checkQuery($query, "There's a problem processing your request. (update sales)");
    return $query;
}

// Update receiving supply
function checkUpdateSalesListCustomer($object)
{
    $query = $object->updateSalesListCustomer();
    checkQuery($query, "There's a problem processing your request. (update sales list customer)");
    return $query;
}

// Read all
function checkReadAllNewData($object)
{
    $query = $object->readAllNewData();
    checkQuery($query, "Empty records. (read All New Data)");
    return $query;
}
