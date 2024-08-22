<?php
class Users
{
    public $users_aid;
    public $users_name;
    public $users_is_active;
    public $users_email;
    public $users_datetime;
    public $users_created;

    public $connection;
    public $lastInsertedId;

    public $tblUsers;

    public $users_start;
    public $users_total;
    public $users_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUsers = "spw1_settings_users";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblUsers} ";
            $sql .= "( users_name, ";
            $sql .= "users_email, ";
            $sql .= "users_is_active, ";
            $sql .= "users_datetime, ";
            $sql .= "users_created ) values ( ";
            $sql .= ":users_name, ";
            $sql .= ":users_email, ";
            $sql .= ":users_is_active, ";
            $sql .= ":users_datetime, ";
            $sql .= ":users_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_name" => $this->users_name,
                "users_email" => $this->users_email,
                "users_is_active" => $this->users_is_active,
                "users_datetime" => $this->users_datetime,
                "users_created" => $this->users_created,
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
            $sql = "select * from {$this->tblUsers} ";
            $sql .= "order by users_is_active desc, ";
            $sql .= "users_name asc ";
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
            $sql = "select * from {$this->tblUsers} ";
            $sql .= "order by users_is_active desc, ";
            $sql .= "users_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->users_start - 1,
                "total" => $this->users_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblUsers} ";
            $sql .= "and users_name like :users_name ";
            $sql .= "order by users_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_name" => "%{$this->users_search}%",
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
            $sql = "select * from {$this->tblUsers} ";
            $sql .= "where users_aid  = :users_aid ";
            $sql .= "order by users_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_aid " => $this->users_aid,
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
            $sql = "update {$this->tblUsers} set ";
            $sql .= "users_name = :users_name, ";
            $sql .= "users_email = :users_email ";
            $sql .= "where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_name" => $this->users_name,
                "users_email" => $this->users_email,
                "users_aid" => $this->users_aid,
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
            $sql = "update {$this->tblUsers} set ";
            $sql .= "users_is_active = :users_is_active, ";
            $sql .= "users_datetime = :users_datetime ";
            $sql .= "where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active" => $this->users_is_active,
                "users_datetime" => $this->users_datetime,
                "users_aid" => $this->users_aid,
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
            $sql = "delete from {$this->tblUsers} ";
            $sql .= "where users_aid  = :users_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_aid" => $this->users_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkEmail()
    {
        try {
            $sql = "select users_email from {$this->tblUsers} ";
            $sql .= "where users_email = :users_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_email" => "{$this->users_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
