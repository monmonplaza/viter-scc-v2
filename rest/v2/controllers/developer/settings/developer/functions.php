<?php

// read role
function checkReadRole($object)
{
    $query = $object->readRole();
    checkQuery($query, "Empty records. (role)");
    return $query;
}

function checkUpdateUserKeyAndNewEmail($object)
{
    $query = $object->updateUserKeyAndNewEmail();
    checkQuery($query, "There's a problem processing your request. (update system user key and new email)");
    return $query;
}


// Update email
function checkUpdateEmailForUser($object)
{
    $query = $object->updateEmailForUser();
    checkQuery($query, "There's a problem processing your request. (update email)");
    return $query;
}

// Update email
function checkUpdateAccountEmail($object)
{
    $query = $object->updateAccountEmail();
    checkQuery($query, "There's a problem processing your request. (update email)");
    return $query;
}
