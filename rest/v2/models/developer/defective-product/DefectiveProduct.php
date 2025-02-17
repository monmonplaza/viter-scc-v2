<?php
class DefectiveProduct
{
    public $defective_product_aid;
    public $defective_product_receiving_supply_id;
    public $defective_product_is_resolve;
    public $defective_product_is_refund;
    public $defective_product_resolved_date;
    public $defective_product_qty;
    public $defective_product_amount;
    public $defective_product_remarks;
    public $defective_product_created;
    public $defective_product_updated;

    public $product_price_aid;
    public $product_price_available_stock;
    public $sales_list_product_id;

    public $receiving_supply_product_id;
    public $receiving_supply_defective_product_qty;
    public $receiving_supply_defective_remarks;

    public $inventory_log_defective_product;
    public $inventory_log_refund_product;
    public $inventory_log_product_id;
    public $inventory_log_updated;

    public $connection;
    public $lastInsertedId;

    public $defective_product_start;
    public $defective_product_total;
    public $defective_product_search;

    public $tblDefectiveProduct;
    public $tblReceivingSupply;
    public $tblProduct;
    public $tblSupplier;
    public $tblReceiving;
    public $tblUnit;
    public $tblInventoryLog;
    public $tblProductPrice;
    public $tblSalesList;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDefectiveProduct = "sccv2_defective_product";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblProduct = "sccv2_product";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblReceiving = "sccv2_receiving";
        $this->tblUnit = "sccv2_settings_unit";
        $this->tblInventoryLog = "sccv2_inventory_log";
        $this->tblProductPrice = "sccv2_product_price";
        $this->tblSalesList = "sccv2_sales_list";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblDefectiveProduct} ";
            $sql .= "( defective_product_receiving_supply_id, ";
            $sql .= "defective_product_qty, ";
            $sql .= "defective_product_is_resolve, ";
            $sql .= "defective_product_is_refund, ";
            $sql .= "defective_product_amount, ";
            $sql .= "defective_product_remarks, ";
            $sql .= "defective_product_updated, ";
            $sql .= "defective_product_created ) values ( ";
            $sql .= ":defective_product_receiving_supply_id, ";
            $sql .= ":defective_product_qty, ";
            $sql .= ":defective_product_is_resolve, ";
            $sql .= ":defective_product_is_refund, ";
            $sql .= ":defective_product_amount, ";
            $sql .= ":defective_product_remarks, ";
            $sql .= ":defective_product_updated, ";
            $sql .= ":defective_product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_receiving_supply_id" => $this->defective_product_receiving_supply_id,
                "defective_product_qty" => $this->defective_product_qty,
                "defective_product_is_resolve" => $this->defective_product_is_resolve,
                "defective_product_is_refund" => $this->defective_product_is_refund,
                "defective_product_amount" => $this->defective_product_amount,
                "defective_product_remarks" => $this->defective_product_remarks,
                "defective_product_updated" => $this->defective_product_updated,
                "defective_product_created" => $this->defective_product_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "dp.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "and dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "order by dp.defective_product_is_resolve asc, ";
            $sql .= "r.receiving_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "dp.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "and dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "order by dp.defective_product_is_resolve asc, ";
            $sql .= "r.receiving_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->defective_product_start - 1,
                "total" => $this->defective_product_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "dp.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "and dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and ( rs.receiving_supply_barcode like :receiving_supply_barcode ";
            $sql .= "or p.product_name like :product_name ";
            $sql .= "or s.supplier_name like :supplier_name ";
            $sql .= "or u.settings_unit_name like :settings_unit_name ";
            $sql .= ") ";
            $sql .= "order by dp.defective_product_is_resolve asc, ";
            $sql .= "r.receiving_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_barcode" => "%{$this->defective_product_search}%",
                "product_name" => "%{$this->defective_product_search}%",
                "supplier_name" => "%{$this->defective_product_search}%",
                "settings_unit_name" => "%{$this->defective_product_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_aid = :defective_product_aid ";
            $sql .= "order by defective_product_is_resolve desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_aid" => $this->defective_product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all inventory
    public function readAllInventory()
    {
        try {
            $sql = "select * from {$this->tblDefectiveProduct} ";
            $sql .= "order by defective_product_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblDefectiveProduct} set ";
            $sql .= "defective_product_qty = :defective_product_qty, ";
            $sql .= "defective_product_amount = :defective_product_amount, ";
            $sql .= "defective_product_remarks = :defective_product_remarks, ";
            $sql .= "defective_product_updated = :defective_product_updated ";
            $sql .= "where defective_product_aid = :defective_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_qty" => $this->defective_product_qty,
                "defective_product_amount" => $this->defective_product_amount,
                "defective_product_remarks" => $this->defective_product_remarks,
                "defective_product_updated" => $this->defective_product_updated,
                "defective_product_aid" => $this->defective_product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblDefectiveProduct} set ";
            $sql .= "defective_product_resolved_date = :defective_product_resolved_date, ";
            $sql .= "defective_product_is_resolve = :defective_product_is_resolve, ";
            $sql .= "defective_product_updated = :defective_product_updated ";
            $sql .= "where defective_product_aid = :defective_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_resolved_date" => $this->defective_product_resolved_date,
                "defective_product_is_resolve" => $this->defective_product_is_resolve,
                "defective_product_updated" => $this->defective_product_updated,
                "defective_product_aid" => $this->defective_product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_aid = :defective_product_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_aid" => $this->defective_product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkReceivedSupply()
    {
        try {
            $sql = "select defective_product_receiving_supply_id from {$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_receiving_supply_id = :defective_product_receiving_supply_id ";
            $sql .= "and defective_product_is_resolve = '0' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_receiving_supply_id" => "{$this->defective_product_receiving_supply_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "dp.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "and dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and dp.defective_product_is_resolve = :defective_product_is_resolve  ";
            $sql .= "order by dp.defective_product_is_resolve asc, ";
            $sql .= "r.receiving_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_is_resolve" => $this->defective_product_is_resolve,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "dp.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "and dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and dp.defective_product_is_resolve = :defective_product_is_resolve  ";
            $sql .= "and ( ";
            $sql .= "rs.receiving_supply_barcode like :receiving_supply_barcode ";
            $sql .= "or p.product_name like :product_name ";
            $sql .= "or s.supplier_name like :supplier_name ";
            $sql .= "or u.settings_unit_name like :settings_unit_name ";
            $sql .= ") ";
            $sql .= "order by dp.defective_product_is_resolve asc, ";
            $sql .= "r.receiving_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_barcode" => "%{$this->defective_product_search}%",
                "product_name" => "%{$this->defective_product_search}%",
                "supplier_name" => "%{$this->defective_product_search}%",
                "settings_unit_name" => "%{$this->defective_product_search}%",
                "defective_product_is_resolve" => $this->defective_product_is_resolve,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateReceivingSupply()
    {
        try {
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "receiving_supply_defective_product_qty = :receiving_supply_defective_product_qty, ";
            $sql .= "receiving_supply_defective_remarks = :receiving_supply_defective_remarks, ";
            $sql .= "receiving_supply_datetime = :receiving_supply_datetime ";
            $sql .= "where receiving_supply_aid = :receiving_supply_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_defective_product_qty" => $this->receiving_supply_defective_product_qty,
                "receiving_supply_defective_remarks" => $this->receiving_supply_defective_remarks,
                "receiving_supply_datetime" => $this->defective_product_updated,
                "receiving_supply_aid" => $this->defective_product_receiving_supply_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // name
    public function checkDefectiveProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(dp.defective_product_qty) as total_defective_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and dp.defective_product_is_resolve = '0' ";
            $sql .= "and dp.defective_product_is_refund = '0' ";
            $sql .= "and rs.receiving_supply_product_id = :receiving_supply_product_id ";
            $sql .= "group by rs.receiving_supply_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkDefectiveRefundProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(dp.defective_product_qty) as total_refund_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and dp.defective_product_is_resolve = '0' ";
            $sql .= "and dp.defective_product_is_refund = '1' ";
            $sql .= "and rs.receiving_supply_product_id = :receiving_supply_product_id ";
            $sql .= "group by rs.receiving_supply_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function readAllDefectiveRefundProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(dp.defective_product_qty) as total_refund_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and dp.defective_product_is_refund = '1' ";
            $sql .= "and rs.receiving_supply_product_id = :receiving_supply_product_id ";
            $sql .= "group by rs.receiving_supply_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Inventory Log
    public function updateInventoryDefectiveProduct()
    {
        try {
            $sql = "update {$this->tblInventoryLog} set ";
            $sql .= "inventory_log_defective_product = :inventory_log_defective_product, ";
            $sql .= "inventory_log_updated = :inventory_log_updated ";
            $sql .= "where inventory_log_product_id = :inventory_log_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "inventory_log_defective_product" => $this->inventory_log_defective_product,
                "inventory_log_updated" => $this->inventory_log_updated,
                "inventory_log_product_id" => $this->inventory_log_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Inventory Log
    public function updateInventoryDefectiveRefundProduct()
    {
        try {
            $sql = "update {$this->tblInventoryLog} set ";
            $sql .= "inventory_log_refund_product = :inventory_log_refund_product, ";
            $sql .= "inventory_log_updated = :inventory_log_updated ";
            $sql .= "where inventory_log_product_id = :inventory_log_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "inventory_log_refund_product" => $this->inventory_log_refund_product,
                "inventory_log_updated" => $this->inventory_log_updated,
                "inventory_log_product_id" => $this->inventory_log_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readStockOutSales($inventory_log_product_id)
    {
        try {
            $sql = "select sales_list_product_id, ";
            $sql .= "SUM(sales_list_quantity) as total_stock_out ";
            $sql .= "from ";
            $sql .= "{$this->tblSalesList} ";
            $sql .= "where sales_list_product_id = :sales_list_product_id ";
            $sql .= "group by sales_list_product_id ";
            $sql .= "order by sales_list_product_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_product_id" => $inventory_log_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function checkReadReceivingSupply()
    {
        try {
            $sql = "select rs.receiving_supply_aid, ";
            $sql .= "SUM(rs.receiving_supply_defective_product_qty) as total_defective, ";
            $sql .= "SUM(rs.receiving_supply_quantity) as total_stockin, ";
            $sql .= "SUM(pr.product_price_stock_out) as total_stockout, ";
            $sql .= "pr.product_price_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblProductPrice} as pr ";
            $sql .= "where rs.receiving_supply_aid = pr.product_price_supply_id ";
            $sql .= "group by rs.receiving_supply_aid ";
            $sql .= "order by rs.receiving_supply_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateProductPriceAvailableStock()
    {
        try {
            $sql = "update {$this->tblProductPrice} set ";
            $sql .= "product_price_available_stock = :product_price_available_stock, ";
            $sql .= "product_price_update = :product_price_update ";
            $sql .= "where product_price_aid = :product_price_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_available_stock" => $this->product_price_available_stock,
                "product_price_update" => $this->inventory_log_updated,
                "product_price_aid" => $this->product_price_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
