<?php
class PettyCash
{
    public $petty_cash_aid;
    public $petty_cash_date;
    public $petty_cash_in;
    public $petty_cash_out;
    public $petty_cash_total;
    public $petty_cash_updated;
    public $petty_cash_created;
    public $petty_cash_reference_no;

    public $connection;
    public $lastInsertedId;

    public $pettycash_start;
    public $pettycash_total;
    public $pettycash_search;

    public $tblPettyCash;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPettyCash = "sccv2_petty_cash";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPettyCash} ";
            $sql .= "( petty_cash_date, ";
            $sql .= "petty_cash_reference_no, ";
            $sql .= "petty_cash_in, ";
            $sql .= "petty_cash_out, ";
            $sql .= "petty_cash_total, ";
            $sql .= "petty_cash_updated, ";
            $sql .= "petty_cash_created ) values ( ";
            $sql .= ":petty_cash_date, ";
            $sql .= ":petty_cash_reference_no, ";
            $sql .= ":petty_cash_in, ";
            $sql .= ":petty_cash_out, ";
            $sql .= ":petty_cash_total, ";
            $sql .= ":petty_cash_updated, ";
            $sql .= ":petty_cash_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_date" => $this->petty_cash_date,
                "petty_cash_reference_no" => $this->petty_cash_reference_no,
                "petty_cash_in" => $this->petty_cash_in,
                "petty_cash_out" => $this->petty_cash_out,
                "petty_cash_total" => $this->petty_cash_total,
                "petty_cash_updated" => $this->petty_cash_updated,
                "petty_cash_created" => $this->petty_cash_created,
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
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "order by petty_cash_aid desc ";
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
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "order by petty_cash_aid desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->pettycash_start - 1,
                "total" => $this->pettycash_total,
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
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "and ( ";
            $sql .= "petty_cash_date like :petty_cash_date ";
            $sql .= "or MONTHNAME(petty_cash_date) like :month_date ";
            $sql .= ") ";
            $sql .= "order by petty_cash_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_date" => "%{$this->pettycash_search}%",
                "month_date" => "%{$this->pettycash_search}%",
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
            $sql = "select * from {$this->tblPettyCash} ";
            $sql .= "where petty_cash_aid = :petty_cash_aid ";
            $sql .= "order by petty_cash_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_aid" => $this->petty_cash_aid,
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
            $sql = "update {$this->tblPettyCash} set ";
            $sql .= "petty_cash_date = :petty_cash_date, ";
            $sql .= "petty_cash_reference_no = :petty_cash_reference_no, ";
            $sql .= "petty_cash_in = :petty_cash_in, ";
            $sql .= "petty_cash_total = :petty_cash_total, ";
            $sql .= "petty_cash_out = :petty_cash_out, ";
            $sql .= "petty_cash_updated = :petty_cash_updated ";
            $sql .= "where petty_cash_aid = :petty_cash_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_date" => $this->petty_cash_date,
                "petty_cash_reference_no" => $this->petty_cash_reference_no,
                "petty_cash_in" => $this->petty_cash_in,
                "petty_cash_total" => $this->petty_cash_total,
                "petty_cash_out" => $this->petty_cash_out,
                "petty_cash_updated" => $this->petty_cash_updated,
                "petty_cash_aid" => $this->petty_cash_aid,
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
            $sql = "delete from {$this->tblPettyCash} ";
            $sql .= "where petty_cash_aid = :petty_cash_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_aid" => $this->petty_cash_aid,
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
            $sql = "select petty_cash_in from {$this->tblPettyCash} ";
            $sql .= "where petty_cash_in = :petty_cash_in ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_in" => "{$this->petty_cash_in}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
