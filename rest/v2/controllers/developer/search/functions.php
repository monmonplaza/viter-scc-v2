<?php

// Read search supplier
function checkSearchSupplier($object)
{
    $query = $object->searchSupplier();
    checkQuery($query, "Empty records. (search supplier)");
    return $query;
}

// Read search customer
function checkSearchCustomer($object)
{
    $query = $object->searchCustomer();
    checkQuery($query, "Empty records. (search customer)");
    return $query;
}

// Read search product
function checkSearchProduct($object)
{
    $query = $object->searchProduct();
    checkQuery($query, "Empty records. (search product)");
    return $query;
}

// Read search product
function checkSearchProductPrice($object)
{
    $query = $object->searchProductPrice();
    checkQuery($query, "Empty records. (search product)");
    return $query;
}

// Read search by product receive supply
function checkSearchProductReceiveSupply($object)
{
    $query = $object->seachProductReceiveSupply();
    checkQuery($query, "Empty records. (search by product receive supply)");
    return $query;
}

// Read search by sales list product
function checkSearchSalesListProduct($object)
{
    $query = $object->searchSalesListProduct();
    checkQuery($query, "Empty records. (search by sales list product)");
    return $query;
}

// Read search reference number
function checkSearchReferenceNo($object)
{
    $query = $object->searchReferenceNo();
    checkQuery($query, "Empty records. (search reference number)");
    return $query;
}
