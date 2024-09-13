<?php
class Customer
{
    public $customer_aid;
    public $customer_name;
    public $customer_address;
    public $customer_mobile_number;
    public $customer_is_active;
    public $customer_updated;
    public $customer_created;

    public $connection;
    public $lastInsertedId;

    public $tblCustomer;

    public $customer_start;
    public $customer_total;
    public $customer_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCustomer = "sccv2_customer";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCustomer} ";
            $sql .= "( customer_name, ";
            $sql .= "customer_address, ";
            $sql .= "customer_is_active, ";
            $sql .= "customer_mobile_number, ";
            $sql .= "customer_updated, ";
            $sql .= "customer_created ) values ( ";
            $sql .= ":customer_name, ";
            $sql .= ":customer_address, ";
            $sql .= ":customer_is_active, ";
            $sql .= ":customer_mobile_number, ";
            $sql .= ":customer_updated, ";
            $sql .= ":customer_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => $this->customer_name,
                "customer_address" => $this->customer_address,
                "customer_is_active" => $this->customer_is_active,
                "customer_mobile_number" => $this->customer_mobile_number,
                "customer_updated" => $this->customer_updated,
                "customer_created" => $this->customer_created,
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
            $sql = "select * from {$this->tblCustomer} ";
            $sql .= "order by customer_is_active desc, ";
            $sql .= "customer_name asc ";
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
            $sql = "select * from {$this->tblCustomer} ";
            $sql .= "order by customer_is_active desc, ";
            $sql .= "customer_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->customer_start - 1,
                "total" => $this->customer_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblCustomer} ";
            $sql .= "where (customer_name like :customer_name ";
            $sql .= "or customer_address like :customer_address ";
            $sql .= ") ";
            $sql .= "order by customer_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => "%{$this->customer_search}%",
                "customer_address" => "%{$this->customer_search}%",
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
            $sql = "select * from {$this->tblCustomer} ";
            $sql .= "where customer_aid = :customer_aid ";
            $sql .= "order by customer_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_aid" => $this->customer_aid,
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
            $sql = "update {$this->tblCustomer} set ";
            $sql .= "customer_name = :customer_name, ";
            $sql .= "customer_address = :customer_address, ";
            $sql .= "customer_mobile_number = :customer_mobile_number, ";
            $sql .= "customer_updated = :customer_updated ";
            $sql .= "where customer_aid = :customer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => $this->customer_name,
                "customer_address" => $this->customer_address,
                "customer_mobile_number" => $this->customer_mobile_number,
                "customer_updated" => $this->customer_updated,
                "customer_aid" => $this->customer_aid,
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
            $sql = "update {$this->tblCustomer} set ";
            $sql .= "customer_is_active = :customer_is_active, ";
            $sql .= "customer_updated = :customer_updated ";
            $sql .= "where customer_aid = :customer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_is_active" => $this->customer_is_active,
                "customer_updated" => $this->customer_updated,
                "customer_aid" => $this->customer_aid,
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
            $sql = "delete from {$this->tblCustomer} ";
            $sql .= "where customer_aid = :customer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_aid" => $this->customer_aid,
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
            $sql = "select customer_name from {$this->tblCustomer} ";
            $sql .= "where customer_name = :customer_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => "{$this->customer_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    // public function checkAssociation()
    // {
    //     try {
    //         $sql = "select product_customer_id from {$this->tblProduct} ";
    //         $sql .= "where product_customer_id = :product_customer_id ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "product_customer_id" => $this->customer_aid,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblCustomer} ";
            $sql .= "where customer_is_active = :customer_is_active ";
            $sql .= "order by customer_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_is_active" => $this->customer_is_active,
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
            $sql .= "from {$this->tblCustomer} ";
            $sql .= "where ";
            $sql .= "customer_is_active = :customer_is_active ";
            $sql .= "and (customer_name like :customer_name ";
            $sql .= "or customer_address like :customer_address ";
            $sql .= ") ";
            $sql .= "order by customer_is_active desc, ";
            $sql .= "customer_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => "%{$this->customer_search}%",
                "customer_address" => "%{$this->customer_search}%",
                "customer_is_active" => $this->customer_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
