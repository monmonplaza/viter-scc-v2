<?php

// Create receiving
function checkCreateReceiving($object)
{
    $query = $object->createReceiving();
    checkQuery($query, "There's a problem processing your request. (create receiving)");
    return $query;
}
