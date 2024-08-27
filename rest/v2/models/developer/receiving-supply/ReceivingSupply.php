<?php
class ReceivingSupply
{
    public $receiving_supply_aid;

    public $receiving_supply_id;
    public $receiving_supply_product_id;
    public $receiving_supply_supplier_id;
    public $receiving_supply_unit;
    public $receiving_supply_quantity;
    public $receiving_supply_price;
    public $receiving_supply_amount;


    public $receiving_supply_is_active;
    public $receiving_supply_datetime;
    public $receiving_supply_created;

    public $connection;
    public $lastInsertedId;

    public $tblReceivingSupply;
    public $tblProduct;
    public $tblSupplier;

    public $receiving_supply_start;
    public $receiving_supply_total;
    public $receiving_supply_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblProduct = "sccv2_product";
        $this->tblSupplier = "sccv2_supplier";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReceivingSupply} ";
            $sql .= "( receiving_supply_id, ";
            $sql .= "receiving_supply_product_id, ";
            $sql .= "receiving_supply_supplier_id, ";
            $sql .= "receiving_supply_unit, ";
            $sql .= "receiving_supply_quantity, ";
            $sql .= "receiving_supply_price, ";
            $sql .= "receiving_supply_amount, ";
            $sql .= "receiving_supply_is_active, ";
            $sql .= "receiving_supply_datetime, ";
            $sql .= "receiving_supply_created ) values ( ";
            $sql .= ":receiving_supply_id, ";
            $sql .= ":receiving_supply_product_id, ";
            $sql .= ":receiving_supply_supplier_id, ";
            $sql .= ":receiving_supply_unit, ";
            $sql .= ":receiving_supply_quantity, ";
            $sql .= ":receiving_supply_price, ";
            $sql .= ":receiving_supply_amount, ";
            $sql .= ":receiving_supply_is_active, ";
            $sql .= ":receiving_supply_datetime, ";
            $sql .= ":receiving_supply_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_id" => $this->receiving_supply_id,
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
                "receiving_supply_supplier_id" => $this->receiving_supply_supplier_id,
                "receiving_supply_unit" => $this->receiving_supply_unit,
                "receiving_supply_quantity" => $this->receiving_supply_quantity,
                "receiving_supply_price" => $this->receiving_supply_price,
                "receiving_supply_amount" => $this->receiving_supply_amount,
                "receiving_supply_is_active" => $this->receiving_supply_is_active,
                "receiving_supply_datetime" => $this->receiving_supply_datetime,
                "receiving_supply_created" => $this->receiving_supply_created,
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
            $sql = "select * from {$this->tblReceivingSupply} as rs, ";
            $sql .= " {$this->tblProduct} as p, ";
            $sql .= " {$this->tblSupplier} as s ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and s.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "order by receiving_supply_is_active desc ";
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
            $sql = "select * from {$this->tblReceivingSupply} ";
            $sql .= "order by receiving_supply_is_active desc, ";
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
            $sql .= "and rs.receiving_supply_id = :receiving_supply_id ";
            $sql .= "order by receiving_supply_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_id" => $this->receiving_supply_id,
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
            $sql .= "receiving_supply_id = :receiving_supply_id, ";
            $sql .= "receiving_supply_product_id = :receiving_supply_product_id, ";
            $sql .= "receiving_supply_supplier_id = :receiving_supply_supplier_id, ";
            $sql .= "receiving_supply_unit = :receiving_supply_unit, ";
            $sql .= "receiving_supply_quantity = :receiving_supply_quantity, ";
            $sql .= "receiving_supply_price = :receiving_supply_price, ";
            $sql .= "receiving_supply_amount = :receiving_supply_amount, ";
            $sql .= "receiving_supply_datetime = :receiving_supply_datetime ";
            $sql .= "where receiving_supply_aid  = :receiving_supply_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_id" => $this->receiving_supply_id,
                "receiving_supply_product_id" => $this->receiving_supply_product_id,
                "receiving_supply_supplier_id" => $this->receiving_supply_supplier_id,
                "receiving_supply_unit" => $this->receiving_supply_unit,
                "receiving_supply_quantity" => $this->receiving_supply_quantity,
                "receiving_supply_price" => $this->receiving_supply_price,
                "receiving_supply_amount" => $this->receiving_supply_amount,
                "receiving_supply_datetime" => $this->receiving_supply_datetime,
                "receiving_supply_aid " => $this->receiving_supply_aid,
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
            $sql .= "where receiving_supply_aid  = :receiving_supply_aid   ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_aid" => $this->receiving_supply_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
