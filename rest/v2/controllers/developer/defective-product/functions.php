<?php

// check name
function isReceivedSupplyExist($object)
{
    $query = $object->checkReceivedSupply();
    $count = $query->rowCount();
    checkExistence($count, "This defective product is already exist.");
}
