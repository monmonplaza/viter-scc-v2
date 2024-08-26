<?php
class Receiving
{
    public $receiving_aid;
    public $receiving_date;
    public $receiving_reference_no;
    public $receiving_total_amount;

    public $receiving_is_active;
    public $receiving_datetime;
    public $receiving_created;

    public $connection;
    public $lastInsertedId;

    public $tblReceiving;
    public $tblSupplier;
    public $tblProduct;

    public $receiving_start;
    public $receiving_total;
    public $receiving_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReceiving = "sccv2_receiving";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblProduct = "sccv2_product";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReceiving} ";
            $sql .= "( receiving_date, ";
            $sql .= "receiving_reference_no, ";
            $sql .= "receiving_is_active, ";
            $sql .= "receiving_datetime, ";
            $sql .= "receiving_created ) values ( ";
            $sql .= ":receiving_date, ";
            $sql .= ":receiving_reference_no, ";
            $sql .= ":receiving_is_active, ";
            $sql .= ":receiving_datetime, ";
            $sql .= ":receiving_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => $this->receiving_date,
                "receiving_reference_no" => $this->receiving_reference_no,
                "receiving_is_active" => $this->receiving_is_active,
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
            $sql .= "order by receiving_is_active desc, ";
            $sql .= "receiving_date asc ";
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
            $sql .= "order by receiving_is_active desc, ";
            $sql .= "receiving_date asc ";
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
            $sql = "select * from {$this->tblReceiving} ";
            $sql .= "and receiving_date like :receiving_date ";
            $sql .= "order by receiving_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => "%{$this->receiving_search}%",
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
            $sql .= "order by receiving_is_active desc ";
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
            $sql .= "receiving_is_active = :receiving_is_active, ";
            $sql .= "receiving_datetime = :receiving_datetime ";
            $sql .= "where receiving_aid = :receiving_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_is_active" => $this->receiving_is_active,
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


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblReceiving} ";
            $sql .= "where receiving_is_active = :receiving_is_active  ";
            $sql .= "order by receiving_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_is_active" => $this->receiving_is_active,
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
            $sql .= "receiving_is_active = :receiving_is_active ";
            $sql .= "and receiving_date like :receiving_date ";
            $sql .= "order by receiving_is_active desc, ";
            $sql .= "receiving_date asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_date" => "%{$this->receiving_search}%",
                "receiving_is_active" => $this->receiving_is_active,
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
}
