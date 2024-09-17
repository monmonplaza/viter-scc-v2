<?php

// check name
function isStockOutExist($object, $name)
{
    $query = $object->checkStockOut();
    $count = $query->rowCount();
    checkExistence($count, "{$name} already exist.");
}

// check name
function isReceivingSupplyExist($object)
{
    $query = $object->checkReceivingSupply();
    $count = $query->rowCount();
    checkExistence($count, "This product already exist.");
}

// is product have price 
function checkHavePrice($object)
{
    $query = $object->havePrice();
    checkQuery($query, "There's a problem processing your request. (is product have price)");
    return $query;
}
