<?php

// Update Total Petty Cash
function checkUpdateTotalPettyCash($object)
{
    $query = $object->updateTotalPettyCash();
    checkQuery($query, "There's a problem processing your request. (update total petty cash)");
    return $query;
}

// Update Total And Reference no
function checkUpdateTotalAndReference($object)
{
    $query = $object->updateTotalAndReference();
    checkQuery($query, "There's a problem processing your request. (update total and reference no.)");
    return $query;
}

// Update Last id
function checkUpdateLastId($object)
{
    $query = $object->updateLastId();
    checkQuery($query, "There's a problem processing your request. (update last id)");
    return $query;
}
