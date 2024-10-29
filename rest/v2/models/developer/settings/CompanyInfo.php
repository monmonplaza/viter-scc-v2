<?php
class CompanyInfo
{
    public $company_info_aid;
    public $company_info_name;
    public $company_info_email;
    public $company_info_phone;
    public $company_info_mobile;
    public $company_info_address;
    public $company_info_color_accent;
    public $company_info_color_secondary;
    public $company_info_logo;
    public $company_info_updated;
    public $company_info_created;

    public $connection;
    public $lastInsertedId;

    public $company_info_start;
    public $company_info_total;
    public $company_info_search;

    public $tblCompanyInfo;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCompanyInfo = "sccv2_company_info";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCompanyInfo} ";
            $sql .= "( company_info_name, ";
            $sql .= "company_info_email, ";
            $sql .= "company_info_phone, ";
            $sql .= "company_info_mobile, ";
            $sql .= "company_info_address, ";
            $sql .= "company_info_color_accent, ";
            $sql .= "company_info_color_secondary, ";
            $sql .= "company_info_logo, ";
            $sql .= "company_info_updated, ";
            $sql .= "company_info_created ) values ( ";
            $sql .= ":company_info_name, ";
            $sql .= ":company_info_email, ";
            $sql .= ":company_info_phone, ";
            $sql .= ":company_info_mobile, ";
            $sql .= ":company_info_address, ";
            $sql .= ":company_info_color_accent, ";
            $sql .= ":company_info_color_secondary, ";
            $sql .= ":company_info_logo, ";
            $sql .= ":company_info_updated, ";
            $sql .= ":company_info_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_name" => $this->company_info_name,
                "company_info_email" => $this->company_info_email,
                "company_info_phone" => $this->company_info_phone,
                "company_info_mobile" => $this->company_info_mobile,
                "company_info_address" => $this->company_info_address,
                "company_info_color_accent" => $this->company_info_color_accent,
                "company_info_color_secondary" => $this->company_info_color_secondary,
                "company_info_logo" => $this->company_info_logo,
                "company_info_updated" => $this->company_info_updated,
                "company_info_created" => $this->company_info_created,
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
            $sql .= "{$this->tblCompanyInfo} ";
            $sql .= "order by company_info_aid desc ";
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
            $sql .= "{$this->tblCompanyInfo} ";
            $sql .= "order by company_info_aid desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->company_info_start - 1,
                "total" => $this->company_info_total,
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
            $sql = "select * from {$this->tblCompanyInfo} ";
            $sql .= "where company_info_aid = :company_info_aid ";
            $sql .= "order by company_info_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_aid" => $this->company_info_aid,
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
            $sql = "update {$this->tblCompanyInfo} set ";
            $sql .= "company_info_name = :company_info_name, ";
            $sql .= "company_info_email = :company_info_email, ";
            $sql .= "company_info_phone = :company_info_phone, ";
            $sql .= "company_info_mobile = :company_info_mobile, ";
            $sql .= "company_info_address = :company_info_address, ";
            $sql .= "company_info_color_accent = :company_info_color_accent, ";
            $sql .= "company_info_color_secondary = :company_info_color_secondary, ";
            $sql .= "company_info_logo = :company_info_logo, ";
            $sql .= "company_info_updated = :company_info_updated ";
            $sql .= "where company_info_aid = :company_info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_name" => $this->company_info_name,
                "company_info_email" => $this->company_info_email,
                "company_info_phone" => $this->company_info_phone,
                "company_info_mobile" => $this->company_info_mobile,
                "company_info_address" => $this->company_info_address,
                "company_info_color_accent" => $this->company_info_color_accent,
                "company_info_color_secondary" => $this->company_info_color_secondary,
                "company_info_logo" => $this->company_info_logo,
                "company_info_updated" => $this->company_info_updated,
                "company_info_aid" => $this->company_info_aid,
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
            $sql = "delete from {$this->tblCompanyInfo} ";
            $sql .= "where company_info_aid = :company_info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_aid" => $this->company_info_aid,
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
            $sql = "select company_info_name from {$this->tblCompanyInfo} ";
            $sql .= "where company_info_name = :company_info_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_name" => "{$this->company_info_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
