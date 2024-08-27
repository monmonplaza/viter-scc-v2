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
