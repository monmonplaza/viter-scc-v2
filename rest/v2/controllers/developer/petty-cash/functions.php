<?php

// Update Product SKU
function checkUpdateProductSKUByLastInsertedId($object)
{
    $query = $object->updateProductSKUByLastInsertedId();
    checkQuery($query, "There's a problem processing your request. (update product sku)");
    return $query;
}

// Read all
function checkReadAllCategory($object)
{
    $query = $object->readAllCategory();
    checkQuery($query, "Empty records. (read all category)");
    return $query;
}

// Create 
function checkCreateInventoryLog($object)
{
    $query = $object->createInventoryLog();
    checkQuery($query, "There's a problem processing your request. (create inventory log)");
    return $query;
}

// Delete Inventory Log 
function checkDeleteInventoryLog($object)
{
    $query = $object->deleteInventoryLog();
    checkQuery($query, "There's a problem processing your request. (delete inventory log)");
    return $query;
}

// check association
function isAssociatedReturnProduct($object)
{
    $query = $object->checkAssociationReturnProduct();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}
