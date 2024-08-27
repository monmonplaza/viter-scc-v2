<?php

// Create receiving
function checkCreateReceiving($object)
{
    $query = $object->createReceiving();
    checkQuery($query, "There's a problem processing your request. (create receiving)");
    return $query;
}

// Read all
function checkReadAllNewReceiveSupply($object)
{
    $query = $object->readAllNewReceiveSupply();
    checkQuery($query, "Empty records. (read all new receive supply)");
    return $query;
}
