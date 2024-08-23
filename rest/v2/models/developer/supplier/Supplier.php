<?php
class Supplier
{
    public $supplier_aid;

    public $supplier_name;
    public $supplier_representative;
    public $supplier_representative_phone;
    public $supplier_phone;
    public $supplier_address;
    public $supplier_email;

    public $supplier_is_active;
    public $supplier_datetime;
    public $supplier_created;

    public $connection;
    public $lastInsertedId;

    public $tblSupplier;

    public $supplier_start;
    public $supplier_total;
    public $supplier_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSupplier = "sccv2_supplier";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSupplier} ";
            $sql .= "( supplier_name, ";
            $sql .= "supplier_representative, ";
            $sql .= "supplier_representative_phone, ";
            $sql .= "supplier_phone, ";
            $sql .= "supplier_address, ";
            $sql .= "supplier_email, ";
            $sql .= "supplier_is_active, ";
            $sql .= "supplier_datetime, ";
            $sql .= "supplier_created ) values ( ";
            $sql .= ":supplier_name, ";
            $sql .= ":supplier_representative, ";
            $sql .= ":supplier_representative_phone, ";
            $sql .= ":supplier_phone, ";
            $sql .= ":supplier_address, ";
            $sql .= ":supplier_email, ";
            $sql .= ":supplier_is_active, ";
            $sql .= ":supplier_datetime, ";
            $sql .= ":supplier_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => $this->supplier_name,
                "supplier_representative" => $this->supplier_representative,
                "supplier_representative_phone" => $this->supplier_representative_phone,
                "supplier_phone" => $this->supplier_phone,
                "supplier_address" => $this->supplier_address,
                "supplier_email" => $this->supplier_email,
                "supplier_is_active" => $this->supplier_is_active,
                "supplier_datetime" => $this->supplier_datetime,
                "supplier_created" => $this->supplier_created,
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
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "order by supplier_is_active desc, ";
            $sql .= "supplier_name asc ";
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
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "order by supplier_is_active desc, ";
            $sql .= "supplier_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->supplier_start - 1,
                "total" => $this->supplier_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "where supplier_name like :supplier_name ";
            $sql .= "order by supplier_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => "%{$this->supplier_search}%",
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
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "where supplier_aid  = :supplier_aid ";
            $sql .= "order by supplier_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_aid" => $this->supplier_aid,
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
            $sql = "update {$this->tblSupplier} set ";
            $sql .= "supplier_name = :supplier_name, ";
            $sql .= "supplier_representative = :supplier_representative ";
            $sql .= "supplier_representative_phone = :supplier_representative_phone ";
            $sql .= "supplier_phone = :supplier_phone ";
            $sql .= "supplier_address = :supplier_address ";
            $sql .= "supplier_email = :supplier_email ";
            $sql .= "supplier_datetime = :supplier_datetime ";
            $sql .= "where supplier_aid = :supplier_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => $this->supplier_name,
                "supplier_representative" => $this->supplier_representative,
                "supplier_representative_phone" => $this->supplier_representative_phone,
                "supplier_phone" => $this->supplier_phone,
                "supplier_address" => $this->supplier_address,
                "supplier_email" => $this->supplier_email,
                "supplier_datetime" => $this->supplier_datetime,
                "supplier_aid" => $this->supplier_aid,
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
            $sql = "update {$this->tblSupplier} set ";
            $sql .= "supplier_is_active = :supplier_is_active, ";
            $sql .= "supplier_datetime = :supplier_datetime ";
            $sql .= "where supplier_aid = :supplier_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_is_active" => $this->supplier_is_active,
                "supplier_datetime" => $this->supplier_datetime,
                "supplier_aid" => $this->supplier_aid,
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
            $sql = "delete from {$this->tblSupplier} ";
            $sql .= "where supplier_aid = :supplier_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_aid" => $this->supplier_aid,
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
            $sql = "select supplier_name from {$this->tblSupplier} ";
            $sql .= "where supplier_name = :supplier_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => "{$this->supplier_name}",
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
            $sql .= "from {$this->tblSupplier} ";
            $sql .= "where supplier_is_active = :supplier_is_active  ";
            $sql .= "order by supplier_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_is_active" => $this->supplier_is_active,
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
            $sql .= "from {$this->tblSupplier} ";
            $sql .= "where ";
            $sql .= "supplier_is_active = :supplier_is_active ";
            $sql .= "and supplier_name like :supplier_name ";
            $sql .= "order by supplier_is_active desc, ";
            $sql .= "supplier_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => "%{$this->supplier_search}%",
                "supplier_is_active" => $this->supplier_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
