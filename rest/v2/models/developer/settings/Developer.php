<?php
class Developer
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

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblDeveloper} ";
            $sql .= "( developer_fname, ";
            $sql .= "developer_lname, ";
            $sql .= "developer_is_active, ";
            $sql .= "developer_email, ";
            $sql .= "developer_role_id, ";
            $sql .= "developer_key, ";
            $sql .= "developer_created, ";
            $sql .= "developer_datetime ) values ( ";
            $sql .= ":developer_fname, ";
            $sql .= ":developer_lname, ";
            $sql .= ":developer_is_active, ";
            $sql .= ":developer_email, ";
            $sql .= ":developer_role_id, ";
            $sql .= ":developer_key, ";
            $sql .= ":developer_created, ";
            $sql .= ":developer_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_fname" => $this->developer_fname,
                "developer_lname" => $this->developer_lname,
                "developer_is_active" => $this->developer_is_active,
                "developer_email" => $this->developer_email,
                "developer_role_id" => $this->developer_role_id,
                "developer_key" => $this->developer_key,
                "developer_created" => $this->developer_created,
                "developer_datetime" => $this->developer_datetime,
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
            $sql = "select user.developer_fname, ";
            $sql .= "user.developer_lname, ";
            $sql .= "user.developer_is_active, ";
            $sql .= "user.developer_email, ";
            $sql .= "user.developer_role_id, ";
            $sql .= "role.*, ";
            $sql .= "user.developer_aid ";
            $sql .= "from {$this->tblDeveloper} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.developer_role_id = role.role_aid ";
            $sql .= "order by user.developer_is_active desc, ";
            $sql .= "user.developer_fname asc ";
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
            $sql = "select user.developer_fname, ";
            $sql .= "user.developer_lname, ";
            $sql .= "user.developer_is_active, ";
            $sql .= "user.developer_email, ";
            $sql .= "user.developer_role_id, ";
            $sql .= "role.*, ";
            $sql .= "user.developer_aid ";
            $sql .= "from {$this->tblDeveloper} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.developer_role_id = role.role_aid ";
            $sql .= "order by user.developer_is_active desc, ";
            $sql .= "user.developer_fname asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->developer_start - 1,
                "total" => $this->developer_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read login
    public function readLogin()
    {
        try {
            $sql = "select user.developer_aid, ";
            $sql .= "user.developer_is_active, ";
            $sql .= "user.developer_fname, ";
            $sql .= "user.developer_lname, ";
            $sql .= "user.developer_email, ";
            $sql .= "user.developer_password, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblDeveloper} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.developer_role_id = role.role_aid ";
            $sql .= "and user.developer_email like :developer_email ";
            $sql .= "and user.developer_is_active = 1 ";
            $sql .= "and role.role_is_developer = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_email" => $this->developer_email,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function search()
    {
        try {
            $sql = "select * from {$this->tblDeveloper} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.developer_role_id = role.role_aid ";
            $sql .= "and ( user.developer_fname like :developer_fname ";
            $sql .= "or user.developer_lname like :developer_lname ";
            $sql .= "or user.developer_email like :developer_email ";
            $sql .= "or concat(user.developer_lname, ' ' , user.developer_lname) like :fullname ";
            $sql .= ") ";
            $sql .= "order by user.developer_is_active desc, ";
            $sql .= "user.developer_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_fname" => "%{$this->developer_search}%",
                "developer_lname" => "%{$this->developer_search}%",
                "developer_email" => "%{$this->developer_search}%",
                "fullname" => "%{$this->developer_search}%",
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
            $sql = "select * from {$this->tblDeveloper} ";
            $sql .= "where developer_aid = :developer_aid ";
            $sql .= "order by developer_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read key
    public function readKey()
    {
        try {
            $sql = "select developer_key from {$this->tblDeveloper} ";
            $sql .= "where developer_key = :developer_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_key" => $this->developer_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read key for email verification
    public function readKeyChangeEmail()
    {
        try {
            $sql = "select ";
            $sql .= "developer_key, ";
            $sql .= "developer_new_email ";
            $sql .= "from {$this->tblDeveloper} ";
            $sql .= "where developer_key = :developer_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_key" => $this->developer_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read role
    public function readRole()
    {
        try {
            $sql = "select * from {$this->tblRole} ";
            $sql .= "where role_is_active = 1 ";
            $sql .= "and role_is_developer = 1 ";
            $sql .= "order by role_is_active desc, ";
            $sql .= "role_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_fname = :developer_fname, ";
            $sql .= "developer_lname = :developer_lname, ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_aid  = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_fname" => $this->developer_fname,
                "developer_lname" => $this->developer_lname,
                "developer_datetime" => $this->developer_datetime,
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateUserKeyAndNewEmail()
    {
        try {
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_key = :developer_key, ";
            $sql .= "developer_new_email = :developer_email, ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_aid  = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_key" => $this->developer_key,
                "developer_email" => $this->developer_email,
                "developer_datetime" => $this->developer_datetime,
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // set password
    public function setPassword()
    {
        try {
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_password = :developer_password, ";
            $sql .= "developer_key = '', ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_key  = :developer_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_password" => $this->developer_password,
                "developer_datetime" => $this->developer_datetime,
                "developer_key" => $this->developer_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // reset password
    public function resetPassword()
    {
        try {
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_key = :developer_key, ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_email  = :developer_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_key" => $this->developer_key,
                "developer_datetime" => $this->developer_datetime,
                "developer_email" => $this->developer_email,
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
            $sql = "update {$this->tblDeveloper} set ";
            $sql .= "developer_is_active = :developer_is_active, ";
            $sql .= "developer_datetime = :developer_datetime ";
            $sql .= "where developer_aid = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_is_active" => $this->developer_is_active,
                "developer_datetime" => $this->developer_datetime,
                "developer_aid" => $this->developer_aid,
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
            $sql = "delete from {$this->tblDeveloper} ";
            $sql .= "where developer_aid = :developer_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_aid" => $this->developer_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validator

    // email
    public function checkEmail()
    {
        try {
            $sql = "select developer_email from {$this->tblDeveloper} ";
            $sql .= "where developer_email = :developer_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "developer_email" => "{$this->developer_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
