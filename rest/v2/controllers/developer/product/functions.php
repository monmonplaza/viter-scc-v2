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
