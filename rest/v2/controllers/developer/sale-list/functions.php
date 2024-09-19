<?php

// Create receiving
function checkCreateSales($object)
{
    $query = $object->createSales();
    checkQuery($query, "There's a problem processing your request. (create sales)");
    return $query;
}

// Update receiving supply
function checkUpdateSales($object)
{
    $query = $object->updateSales();
    checkQuery($query, "There's a problem processing your request. (update sales)");
    return $query;
}

// Update receiving supply
function checkUpdateSalesListCustomer($object)
{
    $query = $object->updateSalesListCustomer();
    checkQuery($query, "There's a problem processing your request. (update sales list customer)");
    return $query;
}

// Update receiving supply
function checkUpdateSalesNewData($object)
{
    $query = $object->updateSalesNewData();
    checkQuery($query, "There's a problem processing your request. (update sales new data)");
    return $query;
}

// Update receiving supply
function checkUpdateQuantity($object)
{
    $query = $object->updateQuantity();
    checkQuery($query, "There's a problem processing your request. (sales list update quantity)");
    return $query;
}

// Update Accept Payment
function checkUpdateAcceptPayment($object)
{
    $query = $object->updateAcceptPayment();
    checkQuery($query, "There's a problem processing your request. (update Accept Payment)");
    return $query;
}

// check Update Inventory StockOut
function checkUpdateInventoryStockOut($object)
{
    $query = $object->updateInventoryStockOut();
    checkQuery($query, "There's a problem processing your request. (Update Inventory StockOut)");
    return $query;
}

// Update Product Price Sold Out
function checkUpdateProductPriceSoldOut($object)
{
    $query = $object->updateProductPriceSoldOut();
    checkQuery($query, "There's a problem processing your request. (update Product Price Sold Out)");
    return $query;
}

// Update Product Price Available Stock
function checkUpdateProductPriceAvailableStock($object)
{
    $query = $object->updateProductPriceAvailableStock();
    checkQuery($query, "There's a problem processing your request. (update Product Price Available Stock)");
    return $query;
}

// Read all
function checkReadAllNewData($object)
{
    $query = $object->readAllNewData();
    checkQuery($query, "Empty records. (read All New Data)");
    return $query;
}
