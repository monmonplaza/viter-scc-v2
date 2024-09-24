<?php

function checkUpdatePassword($object)
{
    $query = $object->updatePassword();
    checkQuery($query, "There's a problem processing your request. (update password)");
    return $query;
}
