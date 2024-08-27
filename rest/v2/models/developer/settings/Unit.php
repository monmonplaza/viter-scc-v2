<?php
class Unit
{
    public $settings_unit_aid;
    public $settings_unit_name;
    public $settings_unit_is_active;
    public $settings_unit_updated;
    public $settings_unit_created;

    public $connection;
    public $lastInsertedId;

    public $settings_unit_start;
    public $settings_unit_total;
    public $settings_unit_search;

    public $tblUnit;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUnit = "sccv2_settings_unit";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblUnit} ";
            $sql .= "( settings_unit_name, ";
            $sql .= "settings_unit_is_active, ";
            $sql .= "settings_unit_updated, ";
            $sql .= "settings_unit_created ) values ( ";
            $sql .= ":settings_unit_name, ";
            $sql .= ":settings_unit_is_active, ";
            $sql .= ":settings_unit_updated, ";
            $sql .= ":settings_unit_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_name" => $this->settings_unit_name,
                "settings_unit_is_active" => $this->settings_unit_is_active,
                "settings_unit_updated" => $this->settings_unit_updated,
                "settings_unit_created" => $this->settings_unit_created,
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

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblUnit} ";
            $sql .= "order by settings_unit_is_active desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->settings_unit_start - 1,
                "total" => $this->settings_unit_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblUnit} ";
            $sql .= "where settings_unit_name like :settings_unit_name ";
            $sql .= "order by settings_unit_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_name" => "%{$this->settings_unit_search}%",
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
            $sql = "select * from {$this->tblUnit} ";
            $sql .= "where settings_unit_aid = :settings_unit_aid ";
            $sql .= "order by settings_unit_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_aid" => $this->settings_unit_aid,
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
            $sql = "update {$this->tblUnit} set ";
            $sql .= "settings_unit_name = :settings_unit_name, ";
            $sql .= "settings_unit_updated = :settings_unit_updated ";
            $sql .= "where settings_unit_aid = :settings_unit_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_name" => $this->settings_unit_name,
                "settings_unit_updated" => $this->settings_unit_updated,
                "settings_unit_aid" => $this->settings_unit_aid,
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
            $sql = "update {$this->tblUnit} set ";
            $sql .= "settings_unit_is_active = :settings_unit_is_active, ";
            $sql .= "settings_unit_updated = :settings_unit_updated ";
            $sql .= "where settings_unit_aid = :settings_unit_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_is_active" => $this->settings_unit_is_active,
                "settings_unit_updated" => $this->settings_unit_updated,
                "settings_unit_aid" => $this->settings_unit_aid,
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
            $sql = "delete from {$this->tblUnit} ";
            $sql .= "where settings_unit_aid = :settings_unit_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_aid" => $this->settings_unit_aid,
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
            $sql = "select settings_unit_name from {$this->tblUnit} ";
            $sql .= "where settings_unit_name = :settings_unit_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_name" => "{$this->settings_unit_name}",
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
            $sql .= "from {$this->tblUnit} ";
            $sql .= "where settings_unit_is_active = :settings_unit_is_active  ";
            $sql .= "order by settings_unit_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_is_active" => $this->settings_unit_is_active,
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
            $sql .= "from {$this->tblUnit} ";
            $sql .= "where ";
            $sql .= "settings_unit_is_active = :settings_unit_is_active ";
            $sql .= "and settings_unit_name like :settings_unit_name ";
            $sql .= "order by settings_unit_is_active desc, ";
            $sql .= "settings_unit_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_unit_name" => "%{$this->settings_unit_search}%",
                "settings_unit_is_active" => $this->settings_unit_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
