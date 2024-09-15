<?php
class ReceivingSupply
{
    public $receiving_supply_aid;
    public $receiving_supply_product_id;
    public $receiving_supply_supplier_id;
    public $receiving_supply_unit_id;
    public $receiving_supply_quantity;
    public $receiving_supply_price;
    public $receiving_supply_amount;
    public $receiving_supply_is_active;
    public $receiving_supply_defective_product_qty;
    public $receiving_supply_defective_remarks;
    public $receiving_supply_datetime;
    public $receiving_supply_created;

    public $receiving_supply_expiration_date;
    public $receiving_supply_barcode;
    public $receiving_aid;
    public $receiving_is_new_data;
    public $receiving_supply_received_id;
    public $receiving_date;
    public $receiving_is_complete;
    public $receiving_reference_no;
    public $receiving_total_amount;
    public $receiving_datetime;
    public $receiving_supply_have_price;

    public $defective_product_aid;
    public $defective_product_amount;

    public $inventory_log_product_id;
    public $inventory_log_stock_in;
    public $inventory_log_stock_out;
    public $inventory_log_defective_product;
    public $inventory_log_return_product;
    public $inventory_log_updated;

    public $connection;
    public $lastInsertedId;

    public $receiving_supply_start;
    public $receiving_supply_total;
    public $receiving_supply_search;

    public $tblReceivingSupply;
    public $tblProduct;
    public $tblSupplier;
    public $tblReceiving;
    public $tblUnit;
    public $tblDefectiveProduct;
    public $tblInventoryLog;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblProduct = "sccv2_product";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblReceiving = "sccv2_receiving";
        $this->tblUnit = "sccv2_settings_unit";
        $this->tblDefectiveProduct = "sccv2_defective_product";
        $this->tblInventoryLog = "sccv2_inventory_log";
    }

    // create
    public function createReceiving()
    {
        try {
            $sql = "insert into {$this->tblReceiving} ";
            $sql .= "( receiving_date, ";
            $sql .= "receiving_is_complete, ";
            $sql .= "receiving_is_new_data, ";
            $sql .= "receiving_datetime, ";
            $sql .= "receiving_created ) values ( ";
            $sql .= ":receiving_date, ";
            $sql .= ":receiving_is_complete, ";
            $sql .= ":receiving_is_new_data, ";
            $sql .= ":receiving_datetime, ";
            $sql .= ":receiving_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
                "receiving_is_complete" => $this->receiving_is_complete,
                "receiving_is_new_data" => $this->receiving_is_new_data,
                "receiving_datetime" => $this->receiving_supply_datetime,
                "receiving_created" => $this->receiving_supply_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReceivingSupply} ";
            $sql .= "( receiving_supply_received_id, ";
            $sql .= "receiving_supply_product_id, ";
            $sql .= "receiving_supply_supplier_id, ";
            $sql .= "receiving_supply_unit_id, ";
            $sql .= "receiving_supply_quantity, ";
            $sql .= "receiving_supply_price, ";
            $sql .= "receiving_supply_amount, ";
            $sql .= "receiving_supply_expiration_date, ";
            $sql .= "receiving_supply_barcode, ";
            $sql .= "receiving_supply_is_active, ";
            $sql .= "receiving_supply_have_price, ";
            $sql .= "receiving_supply_defective_product_qty, ";
            $sql .= "receiving_supply_datetime, ";
            $sql .= "receiving_supply_created ) values ( ";
            $sql .= ":receiving_supply_received_id, ";
            $sql .= ":receiving_supply_product_id, ";
            $sql .= ":receiving_supply_supplier_id, ";
            $sql .= ":receiving_supply_unit_id, ";
            $sql .= ":receiving_supply_quantity, ";
            $sql .= ":receiving_supply_price, ";
            $sql .= ":receiving_supply_amount, ";
            $sql .= ":receiving_supply_expiration_date, ";
            $sql .= ":receiving_supply_barcode, ";
            $sql .= ":receiving_supply_is_active, ";
            $sql .= ":receiving_supply_have_price, ";
            $sql .= ":receiving_supply_defective_product_qty, ";
            $sql .= ":receiving_supply_datetime, ";
            $sql .= ":receiving_supply_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_received_id" => $this->receiving_aid,
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
                "receiving_supply_supplier_id" => $this->receiving_supply_supplier_id,
                "receiving_supply_unit_id" => $this->receiving_supply_unit_id,
                "receiving_supply_quantity" => $this->receiving_supply_quantity,
                "receiving_supply_price" => $this->receiving_supply_price,
                "receiving_supply_amount" => $this->receiving_supply_amount,
                "receiving_supply_expiration_date" => $this->receiving_supply_expiration_date,
                "receiving_supply_barcode" => $this->receiving_supply_barcode,
                "receiving_supply_is_active" => $this->receiving_supply_is_active,
                "receiving_supply_have_price" => $this->receiving_supply_have_price,
                "receiving_supply_defective_product_qty" => $this->receiving_supply_defective_product_qty,
                "receiving_supply_datetime" => $this->receiving_supply_datetime,
                "receiving_supply_created" => $this->receiving_supply_created,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all New Receive Supply
    public function readAllNewReceiveSupply()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where r.receiving_is_new_data = '1' ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.receiving_supply_is_active desc, ";
            $sql .= "rs.receiving_supply_created desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all New Receive Supply
    public function readAllNewReceiveSupplyById()
    {
        try {
            $sql = "select r.*, ";
            $sql .= "rs.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where rs.receiving_supply_received_id = :receiving_supply_received_id ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.receiving_supply_is_active desc, ";
            $sql .= "rs.receiving_supply_created desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_received_id" => "{$this->receiving_supply_received_id}",
            ]);
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
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= " from ";
            $sql .= " {$this->tblReceivingSupply} as rs, ";
            $sql .= " {$this->tblReceiving} as r, ";
            $sql .= " {$this->tblUnit} as u, ";
            $sql .= " {$this->tblProduct} as p, ";
            $sql .= " {$this->tblSupplier} as s ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.receiving_supply_aid desc ";
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
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "s.supplier_name ";
            $sql .= " from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.receiving_supply_aid desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->receiving_supply_start - 1,
                "total" => $this->receiving_supply_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readById()
    {
        try {
            $sql = "select * from {$this->tblReceivingSupply} as rs, ";
            $sql .= " {$this->tblProduct} as p, ";
            $sql .= " {$this->tblSupplier} as s ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and rs.receiving_supply_received_id = :receiving_supply_received_id ";
            $sql .= "order by receiving_supply_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_received_id" => $this->receiving_supply_received_id,
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
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "receiving_supply_product_id = :receiving_supply_product_id, ";
            $sql .= "receiving_supply_supplier_id = :receiving_supply_supplier_id, ";
            $sql .= "receiving_supply_unit_id = :receiving_supply_unit_id, ";
            $sql .= "receiving_supply_quantity = :receiving_supply_quantity, ";
            $sql .= "receiving_supply_price = :receiving_supply_price, ";
            $sql .= "receiving_supply_expiration_date = :receiving_supply_expiration_date, ";
            $sql .= "receiving_supply_barcode = :receiving_supply_barcode, ";
            $sql .= "receiving_supply_amount = :receiving_supply_amount, ";
            $sql .= "receiving_supply_defective_product_qty = :receiving_supply_defective_product_qty, ";
            $sql .= "receiving_supply_defective_remarks = :receiving_supply_defective_remarks, ";
            $sql .= "receiving_supply_datetime = :receiving_supply_datetime ";
            $sql .= "where receiving_supply_aid = :receiving_supply_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
                "receiving_supply_supplier_id" => $this->receiving_supply_supplier_id,
                "receiving_supply_unit_id" => $this->receiving_supply_unit_id,
                "receiving_supply_quantity" => $this->receiving_supply_quantity,
                "receiving_supply_price" => $this->receiving_supply_price,
                "receiving_supply_expiration_date" => $this->receiving_supply_expiration_date,
                "receiving_supply_barcode" => $this->receiving_supply_barcode,
                "receiving_supply_amount" => $this->receiving_supply_amount,
                "receiving_supply_defective_product_qty" => $this->receiving_supply_defective_product_qty,
                "receiving_supply_defective_remarks" => $this->receiving_supply_defective_remarks,
                "receiving_supply_datetime" => $this->receiving_supply_datetime,
                "receiving_supply_aid" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateReferenceNumber()
    {
        try {
            $sql = "update {$this->tblReceiving} set ";
            $sql .= "receiving_reference_no = :receiving_reference_no, ";
            $sql .= "receiving_total_amount = :receiving_total_amount, ";
            $sql .= "receiving_datetime = :receiving_datetime ";
            $sql .= "where receiving_aid = :receiving_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_reference_no" => $this->receiving_reference_no,
                "receiving_total_amount" => $this->receiving_total_amount,
                "receiving_datetime" => $this->receiving_datetime,
                "receiving_aid" => $this->receiving_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateReceiving()
    {
        try {
            $sql = "update {$this->tblReceiving} set ";
            $sql .= "receiving_date = :receiving_date, ";
            $sql .= "receiving_total_amount = :receiving_total_amount, ";
            $sql .= "receiving_datetime = :receiving_datetime ";
            $sql .= "where receiving_aid = :receiving_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
                "receiving_total_amount" => $this->receiving_total_amount,
                "receiving_datetime" => $this->receiving_datetime,
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
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "receiving_supply_is_active = :receiving_supply_is_active, ";
            $sql .= "receiving_supply_datetime = :receiving_supply_datetime ";
            $sql .= "where receiving_supply_aid  = :receiving_supply_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_is_active" => $this->receiving_supply_is_active,
                "receiving_supply_datetime" => $this->receiving_supply_datetime,
                "receiving_supply_aid" => $this->receiving_supply_aid,
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
            $sql = "delete from {$this->tblReceivingSupply} ";
            $sql .= "where receiving_supply_aid = :receiving_supply_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_aid" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function deleteDefective()
    {
        try {
            $sql = "delete from {$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_receiving_supply_id = :defective_product_receiving_supply_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_receiving_supply_id" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkAssociationDefective()
    {
        try {
            $sql = "select defective_product_receiving_supply_id from {$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_receiving_supply_id = :defective_product_receiving_supply_id ";
            $sql .= "and defective_product_is_resolve = '1' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_receiving_supply_id" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkDate()
    {
        try {
            $sql = "select receiving_date from {$this->tblReceiving} ";
            $sql .= "where receiving_date = :receiving_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkBarcode()
    {
        try {
            $sql = "select receiving_supply_product_id, ";
            $sql .= "receiving_supply_barcode ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} ";
            $sql .= "where receiving_supply_barcode = :receiving_supply_barcode ";
            $sql .= "group by receiving_supply_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_barcode" => $this->receiving_supply_barcode,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkDateGetLastAid()
    {
        try {
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "where receiving_is_new_data = '1' ";
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
            $sql .= "SUM(receiving_supply_quantity) as total_product_stock_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} ";
            $sql .= "where receiving_supply_product_id = :receiving_supply_product_id ";
            $sql .= "group by receiving_supply_product_id ";
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
            $sql .= "SUM(dp.defective_product_qty) as total_defective_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblDefectiveProduct} as dp ";
            $sql .= "where dp.defective_product_receiving_supply_id = rs.receiving_supply_aid ";
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

    // name
    public function checkGetTotalAmountById()
    {
        try {
            $sql = "select sum(receiving_supply_amount) as amount ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} ";
            $sql .= "where receiving_supply_received_id = :receiving_supply_received_id ";
            $sql .= "group by receiving_supply_received_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_received_id" => $this->receiving_supply_received_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkGetTotalAmountByNewData()
    {
        try {
            $sql = "select sum(rs.receiving_supply_amount) as amount ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r ";
            $sql .= "where r.receiving_is_new_data = '1' ";
            $sql .= "and rs.receiving_supply_received_id = r.receiving_aid ";
            $sql .= "group by r.receiving_is_new_data";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkDefectiveById()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblDefectiveProduct} ";
            $sql .= "where defective_product_is_resolve = '0' ";
            $sql .= "and defective_product_receiving_supply_id = :receiving_supply_aid ";
            $sql .= "group by defective_product_receiving_supply_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_aid" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function createDefective()
    {
        try {
            $sql = "insert into {$this->tblDefectiveProduct} ";
            $sql .= "( defective_product_receiving_supply_id, ";
            $sql .= "defective_product_is_resolve, ";
            $sql .= "defective_product_qty, ";
            $sql .= "defective_product_amount, ";
            $sql .= "defective_product_remarks, ";
            $sql .= "defective_product_updated, ";
            $sql .= "defective_product_created ) values ( ";
            $sql .= ":defective_product_receiving_supply_id, ";
            $sql .= ":defective_product_is_resolve, ";
            $sql .= ":defective_product_qty, ";
            $sql .= ":defective_product_amount, ";
            $sql .= ":defective_product_remarks, ";
            $sql .= ":defective_product_updated, ";
            $sql .= ":defective_product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_receiving_supply_id" => $this->receiving_supply_aid,
                "defective_product_is_resolve" => $this->receiving_is_complete,
                "defective_product_qty" => $this->receiving_supply_defective_product_qty,
                "defective_product_amount" => $this->defective_product_amount,
                "defective_product_remarks" => $this->receiving_supply_defective_remarks,
                "defective_product_updated" => $this->receiving_supply_datetime,
                "defective_product_created" => $this->receiving_supply_created,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateDefective()
    {
        try {
            $sql = "update {$this->tblDefectiveProduct} set ";
            $sql .= "defective_product_qty = :defective_product_qty, ";
            $sql .= "defective_product_remarks = :defective_product_remarks, ";
            $sql .= "defective_product_amount = :defective_product_amount, ";
            $sql .= "defective_product_updated = :defective_product_updated ";
            $sql .= "where defective_product_aid = :defective_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "defective_product_qty" => $this->receiving_supply_defective_product_qty,
                "defective_product_remarks" => $this->receiving_supply_defective_remarks,
                "defective_product_amount" => $this->defective_product_amount,
                "defective_product_updated" => $this->receiving_supply_datetime,
                "defective_product_aid" => $this->defective_product_aid,
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
