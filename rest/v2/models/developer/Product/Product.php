<?php
class Product
{
    public $product_aid;
    public $product_sku;
    public $product_name;
    public $product_description;
    public $product_barcode;
    public $product_is_active;
    public $product_datetime;
    public $product_created;

    public $connection;
    public $lastInsertedId;

    public $tblProduct;

    public $product_start;
    public $product_total;
    public $product_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv2_product";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_sku, ";
            $sql .= "product_name, ";
            $sql .= "product_description, ";
            $sql .= "product_barcode, ";
            $sql .= "product_is_active, ";
            $sql .= "product_datetime, ";
            $sql .= "product_created ) values ( ";
            $sql .= ":product_sku, ";
            $sql .= ":product_name, ";
            $sql .= ":product_description, ";
            $sql .= ":product_barcode, ";
            $sql .= ":product_is_active, ";
            $sql .= ":product_datetime, ";
            $sql .= ":product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_sku" => $this->product_sku,
                "product_name" => $this->product_name,
                "product_description" => $this->product_description,
                "product_barcode" => $this->product_barcode,
                "product_is_active" => $this->product_is_active,
                "product_datetime" => $this->product_datetime,
                "product_created" => $this->product_created,
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
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
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
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_start - 1,
                "total" => $this->product_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "where product_name like :product_name ";
            $sql .= "order by product_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->product_search}%",
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
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "where product_aid  = :product_aid ";
            $sql .= "order by product_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
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
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_name = :product_name, ";
            $sql .= "product_description = :product_description ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_description" => $this->product_description,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->product_aid,
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
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_is_active = :product_is_active, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_is_active" => $this->product_is_active,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->product_aid,
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
            $sql = "delete from {$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select product_name from {$this->tblProduct} ";
            $sql .= "where product_name = :product_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "{$this->product_name}",
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
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where product_is_active = :product_is_active  ";
            $sql .= "order by product_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_is_active" => $this->product_is_active,
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
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where ";
            $sql .= "product_is_active = :product_is_active ";
            $sql .= "and product_name like :product_name ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->product_search}%",
                "product_is_active" => $this->product_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
