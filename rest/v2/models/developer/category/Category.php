<?php
class Category
{
    public $category_aid;

    public $category_name;
    public $category_description;


    public $category_is_active;
    public $category_datetime;
    public $category_created;

    public $connection;
    public $lastInsertedId;

    public $tblCategory;

    public $category_start;
    public $category_total;
    public $category_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCategory = "sccv2_category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCategory} ";
            $sql .= "( category_name, ";
            $sql .= "category_description, ";
            $sql .= "category_is_active, ";
            $sql .= "category_datetime, ";
            $sql .= "category_created ) values ( ";
            $sql .= ":category_name, ";
            $sql .= ":category_description, ";
            $sql .= ":category_is_active, ";
            $sql .= ":category_datetime, ";
            $sql .= ":category_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_is_active" => $this->category_is_active,
                "category_datetime" => $this->category_datetime,
                "category_created" => $this->category_created,
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
            $sql = "select * from {$this->tblCategory} ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_name asc ";
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
            $sql = "select * from {$this->tblCategory} ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->category_start - 1,
                "total" => $this->category_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblCategory} ";
            $sql .= "where category_name like :category_name ";
            $sql .= "order by category_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => "%{$this->category_search}%",
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
            $sql = "select * from {$this->tblCategory} ";
            $sql .= "where category_aid  = :category_aid ";
            $sql .= "order by category_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
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
            $sql = "update {$this->tblCategory} set ";
            $sql .= "category_name = :category_name, ";
            $sql .= "category_description = :category_description ";
            $sql .= "category_datetime = :category_datetime ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_datetime" => $this->category_datetime,
                "category_aid" => $this->category_aid,
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
            $sql = "update {$this->tblCategory} set ";
            $sql .= "category_is_active = :category_is_active, ";
            $sql .= "category_datetime = :category_datetime ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_datetime" => $this->category_datetime,
                "category_aid" => $this->category_aid,
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
            $sql = "delete from {$this->tblCategory} ";
            $sql .= "where category_aid = :category_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
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
            $sql = "select category_name from {$this->tblCategory} ";
            $sql .= "where category_name = :category_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => "{$this->category_name}",
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
            $sql .= "from {$this->tblCategory} ";
            $sql .= "where category_is_active = :category_is_active  ";
            $sql .= "order by category_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
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
            $sql .= "from {$this->tblCategory} ";
            $sql .= "where ";
            $sql .= "category_is_active = :category_is_active ";
            $sql .= "and category_name like :category_name ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => "%{$this->category_search}%",
                "category_is_active" => $this->category_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
