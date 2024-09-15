<?php

// Read search supplier
function checkSearchSupplier($object)
{
    $query = $object->searchSupplier();
    checkQuery($query, "Empty records. (search supplier)");
    return $query;
}

// Read search product
function checkSearchProduct($object)
{
    $query = $object->searchProduct();
    checkQuery($query, "Empty records. (search product)");
    return $query;
}

// Read search Product Receive Supply
function checkSearchProductReceiveSupply($object)
{
    $query = $object->SeachProductReceiveSupply();
    checkQuery($query, "Empty records. (search by product receive supply)");
    return $query;
}
