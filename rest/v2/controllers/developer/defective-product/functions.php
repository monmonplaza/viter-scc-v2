<?php

// check name
function isReceivedSupplyExist($object)
{
    $query = $object->checkReceivedSupply();
    $count = $query->rowCount();
    checkExistence($count, "This defective product is already exist.");
}


// Update 
function checkUpdateReceivingSupply($object)
{
    $query = $object->updateReceivingSupply();
    checkQuery($query, "There's a problem processing your request. (update receiving supply)");
    return $query;
}
