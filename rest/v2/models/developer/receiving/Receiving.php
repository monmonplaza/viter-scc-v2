<?php
class Receiving
{
    public $receiving_aid;
    public $receiving_date;
    public $receiving_reference_no;
    public $receiving_total_amount;
    public $receiving_is_complete;
    public $receiving_datetime;
    public $receiving_created;

    public $receiving_supply_product_id;

    public $inventory_log_product_id;
    public $inventory_log_stock_in;
    public $inventory_log_stock_out;
    public $inventory_log_defective_product;
    public $inventory_log_return_product;
    public $inventory_log_updated;

    public $connection;
    public $lastInsertedId;

    public $receiving_start;
    public $receiving_total;
    public $receiving_search;

    public $tblReceiving;
    public $tblSupplier;
    public $tblProduct;
    public $tblUnit;
    public $tblReceivingSupply;
    public $tblDefectiveProduct;
    public $tblInventoryLog;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReceiving = "sccv2_receiving";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblProduct = "sccv2_product";
        $this->tblUnit = "sccv2_settings_unit";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblDefectiveProduct = "sccv2_defective_product";
        $this->tblInventoryLog = "sccv2_inventory_log";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReceiving} ";
            $sql .= "( receiving_date, ";
            $sql .= "receiving_reference_no, ";
            $sql .= "receiving_is_complete, ";
            $sql .= "receiving_datetime, ";
            $sql .= "receiving_created ) values ( ";
            $sql .= ":receiving_date, ";
            $sql .= ":receiving_reference_no, ";
            $sql .= ":receiving_is_complete, ";
            $sql .= ":receiving_datetime, ";
            $sql .= ":receiving_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
                "receiving_reference_no" => $this->receiving_reference_no,
                "receiving_is_complete" => $this->receiving_is_complete,
                "receiving_datetime" => $this->receiving_datetime,
                "receiving_created" => $this->receiving_created,
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
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "order by receiving_is_complete asc, ";
            $sql .= "DATE(receiving_date) desc ";
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
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "order by receiving_is_complete asc, ";
            $sql .= "DATE(receiving_date) desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->receiving_start - 1,
                "total" => $this->receiving_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblReceiving} ";
            $sql .= "where (receiving_date like :receiving_date ";
            $sql .= "or MONTHNAME(receiving_date) like :monthName ";
            $sql .= "or receiving_reference_no like :receiving_reference_no ";
            $sql .= ") ";
            $sql .= "order by receiving_is_complete asc, ";
            $sql .= "DATE(receiving_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => "%{$this->receiving_search}%",
                "monthName" => "%{$this->receiving_search}%",
                "receiving_reference_no" => "%{$this->receiving_search}%",
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
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "where receiving_aid  = :receiving_aid ";
            $sql .= "order by receiving_is_complete desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_aid " => $this->receiving_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblReceiving} set ";
            $sql .= "receiving_date = :receiving_date, ";
            $sql .= "where receiving_aid = :receiving_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
                "receiving_aid" => $this->receiving_aid,
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
            $sql = "update {$this->tblReceiving} set ";
            $sql .= "receiving_is_complete = :receiving_is_complete, ";
            $sql .= "receiving_datetime = :receiving_datetime ";
            $sql .= "where receiving_aid = :receiving_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_is_complete" => $this->receiving_is_complete,
                "receiving_datetime" => $this->receiving_datetime,
                "receiving_aid" => $this->receiving_aid,
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
            $sql = "delete from {$this->tblReceiving} ";
            $sql .= "where receiving_aid  = :receiving_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_aid" => $this->receiving_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "where receiving_date = :receiving_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function filterByDate()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblReceiving} ";
            $sql .= "where DATE(receiving_date) = DATE(:receiving_date) ";
            $sql .= "order by receiving_is_complete asc, ";
            $sql .= "DATE(receiving_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblReceiving} ";
            $sql .= "where receiving_is_complete = :receiving_is_complete  ";
            $sql .= "order by receiving_is_complete desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_is_complete" => $this->receiving_is_complete,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblReceiving} ";
            $sql .= "where ";
            $sql .= "receiving_is_complete = :receiving_is_complete ";
            $sql .= "and (receiving_date like :receiving_date ";
            $sql .= "or MONTHNAME(receiving_date) like :monthName ";
            $sql .= "or receiving_reference_no like :receiving_reference_no ";
            $sql .= ") ";
            $sql .= "order by receiving_is_complete asc, ";
            $sql .= "DATE(receiving_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => "%{$this->receiving_search}%",
                "monthName" => "%{$this->receiving_search}%",
                "receiving_reference_no" => "%{$this->receiving_search}%",
                "receiving_is_complete" => $this->receiving_is_complete,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all
    public function readAllSupplier()
    {
        try {
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "order by supplier_is_active desc, ";
            $sql .= "supplier_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }



    public function readAllProduct()
    {
        try {
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function checkAssociation()
    {
        try {
            $sql = "select receiving_supply_received_id ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} ";
            $sql .= "where receiving_supply_received_id = :receiving_supply_received_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_received_id" => "{$this->receiving_aid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAllUnit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblUnit} ";
            $sql .= "order by settings_unit_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update new data
    public function updateAllNewData()
    {
        try {
            $sql = "update {$this->tblReceiving} set ";
            $sql .= "receiving_is_new_data = '0' ";
            $sql .= "where receiving_is_new_data = '1' ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkInventoryLog()
    {
        try {
            $sql = "select il.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_sku, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblInventoryLog} as il, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where il.inventory_log_product_id = p.product_aid ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "r.receiving_is_complete, ";
            $sql .= "rs.receiving_supply_product_id, ";
            $sql .= "SUM(rs.receiving_supply_quantity) as total_product_stock_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r ";
            $sql .= "where rs.receiving_supply_received_id = r.receiving_aid ";
            $sql .= "and r.receiving_is_complete = '1' ";
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
    public function checkDefectiveProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "dp.defective_product_is_resolve, ";
            $sql .= "rs.receiving_supply_product_id, ";
            $sql .= "SUM(dp.defective_product_qty) as total_defective_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblDefectiveProduct} as dp, ";
            $sql .= "{$this->tblReceiving} as r ";
            $sql .= "where dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
            $sql .= "and rs.receiving_supply_received_id = r.receiving_aid ";
            $sql .= "and r.receiving_is_complete = '1' ";
            $sql .= "and dp.defective_product_is_resolve = '0' ";
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
    public function updateInventoryStockIn()
    {
        try {
            $sql = "update {$this->tblInventoryLog} set ";
            $sql .= "inventory_log_stock_in = :inventory_log_stock_in, ";
            $sql .= "inventory_log_updated = :inventory_log_updated ";
            $sql .= "where inventory_log_product_id = :inventory_log_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "inventory_log_stock_in" => $this->inventory_log_stock_in,
                "inventory_log_updated" => $this->inventory_log_updated,
                "inventory_log_product_id" => $this->inventory_log_product_id,
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
}
