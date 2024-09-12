<?php
class ReturnProduct
{
    public $return_product_aid;
    public $return_product_is_resolved;
    public $return_product_id;
    public $return_product_date;
    public $return_product_qty;
    public $return_product_resolved_date;
    public $return_product_remarks;
    public $return_product_updated;
    public $return_product_created;

    public $product_name;

    public $connection;
    public $lastInsertedId;

    public $return_product_start;
    public $return_product_total;
    public $return_product_search;

    public $tblReturnProduct;
    public $tblProduct;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReturnProduct = "sccv2_return_product";
        $this->tblProduct = "sccv2_product";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReturnProduct} ";
            $sql .= "( return_product_id, ";
            $sql .= "return_product_date, ";
            $sql .= "return_product_is_resolved, ";
            $sql .= "return_product_qty, ";
            $sql .= "return_product_remarks, ";
            $sql .= "return_product_updated, ";
            $sql .= "return_product_created ) values ( ";
            $sql .= ":return_product_id, ";
            $sql .= ":return_product_date, ";
            $sql .= ":return_product_is_resolved, ";
            $sql .= ":return_product_qty, ";
            $sql .= ":return_product_remarks, ";
            $sql .= ":return_product_updated, ";
            $sql .= ":return_product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => $this->return_product_id,
                "return_product_date" => $this->return_product_date,
                "return_product_is_resolved" => $this->return_product_is_resolved,
                "return_product_qty" => $this->return_product_qty,
                "return_product_remarks" => $this->return_product_remarks,
                "return_product_updated" => $this->return_product_updated,
                "return_product_created" => $this->return_product_created,
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
            $sql = "select rp.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "p.product_name asc ";
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
            $sql = "select rp.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "p.product_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->return_product_start - 1,
                "total" => $this->return_product_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select rp.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or MONTHNAME(rp.return_product_date) like :month_name ";
            $sql .= "or MONTHNAME(rp.return_product_resolved_date) like :resolved_month_name ";
            $sql .= "or rp.return_product_date like :return_product_date ";
            $sql .= "or rp.return_product_resolved_date like :return_product_resolved_date ";
            $sql .= ") ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->return_product_search}%",
                "month_name" => "%{$this->return_product_search}%",
                "resolved_month_name" => "%{$this->return_product_search}%",
                "return_product_date" => "%{$this->return_product_search}%",
                "return_product_resolved_date" => "%{$this->return_product_search}%",
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
            $sql = "select * from {$this->tblReturnProduct} ";
            $sql .= "where return_product_aid = :return_product_aid ";
            $sql .= "order by return_product_is_resolved desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_aid" => $this->return_product_aid,
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
            $sql = "update {$this->tblReturnProduct} set ";
            $sql .= "return_product_id = :return_product_id, ";
            $sql .= "return_product_date = :return_product_date, ";
            $sql .= "return_product_qty = :return_product_qty, ";
            $sql .= "return_product_remarks = :return_product_remarks, ";
            $sql .= "return_product_updated = :return_product_updated ";
            $sql .= "where return_product_aid = :return_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => $this->return_product_id,
                "return_product_date" => $this->return_product_date,
                "return_product_qty" => $this->return_product_qty,
                "return_product_remarks" => $this->return_product_remarks,
                "return_product_updated" => $this->return_product_updated,
                "return_product_aid" => $this->return_product_aid,
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
            $sql = "update {$this->tblReturnProduct} set ";
            $sql .= "return_product_resolved_date = :return_product_resolved_date, ";
            $sql .= "return_product_is_resolved = :return_product_is_resolved, ";
            $sql .= "return_product_updated = :return_product_updated ";
            $sql .= "where return_product_aid = :return_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_resolved_date" => $this->return_product_resolved_date,
                "return_product_is_resolved" => $this->return_product_is_resolved,
                "return_product_updated" => $this->return_product_updated,
                "return_product_aid" => $this->return_product_aid,
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
            $sql = "delete from {$this->tblReturnProduct} ";
            $sql .= "where return_product_aid = :return_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_aid" => $this->return_product_aid,
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
            $sql = "select return_product_id from {$this->tblReturnProduct} ";
            $sql .= "where return_product_id = :return_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => "{$this->return_product_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select rp.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where rp.return_product_is_resolved = :return_product_is_resolved  ";
            $sql .= "and rp.return_product_id = p.product_aid ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_is_resolved" => $this->return_product_is_resolved,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select rp.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where rp.return_product_is_resolved = :return_product_is_resolved ";
            $sql .= "and rp.return_product_id = p.product_aid ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or MONTHNAME(rp.return_product_date) like :month_name ";
            $sql .= "or MONTHNAME(rp.return_product_resolved_date) like :resolved_month_name ";
            $sql .= "or rp.return_product_date like :return_product_date ";
            $sql .= "or rp.return_product_resolved_date like :return_product_resolved_date ";
            $sql .= ") ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->return_product_search}%",
                "month_name" => "%{$this->return_product_search}%",
                "resolved_month_name" => "%{$this->return_product_search}%",
                "return_product_date" => "%{$this->return_product_search}%",
                "return_product_resolved_date" => "%{$this->return_product_search}%",
                "return_product_is_resolved" => $this->return_product_is_resolved,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
