<?php

// Update Inventory Log
function checkUpdateInventoryReturnProduct($object)
{
    $query = $object->updateInventoryReturnProduct();
    checkQuery($query, "There's a problem processing your request. (update Inventory Return Product)");
    return $query;
}
