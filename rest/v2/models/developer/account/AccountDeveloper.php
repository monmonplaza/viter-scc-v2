<?php
class AccountDeveloper
{
    public $developer_aid;
    public $developer_is_active;
    public $developer_fname;
    public $developer_lname;
    public $developer_email;
    public $developer_new_email;
    public $developer_role_id;
    public $developer_key;
    public $developer_password;
    public $developer_created;
    public $developer_datetime;

    public $connection;
    public $lastInsertedId;
    public $developer_start;
    public $developer_total;
    public $developer_search;

    public $tblDeveloper;
    public $tblRole;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDeveloper = "sccv2_settings_developer";
        $this->tblRole = "sccv2_settings_role";
    }

    // read account
    public function readAccount()
    {
        try {
            $sql = "select developer_aid, ";
            $sql .= "developer_is_active, ";
            $sql .= "developer_password ";
            $sql .= "from {$this->tblDeveloper} ";
            $sql .= "where ";
            $sql .= "developer_is_active = 1 ";
            $sql .= "and developer_aid = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // set password
    public function updatePassword()
    {
        try {
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_password = :developer_password, ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_aid = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_password" => $this->developer_password,
                "developer_datetime" => $this->developer_datetime,
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
