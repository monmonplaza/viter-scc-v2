<?php
class ReturnProduct
{
    public $return_product_aid;
    public $return_product_is_resolved;
    public $return_product_id;
    public $return_product_sales_list_id;
    public $return_product_date;
    public $return_product_qty;
    public $return_product_resolved_date;
    public $return_product_remarks;
    public $return_product_is_refund;
    public $return_product_updated;
    public $return_product_created;

    public $product_name;
    public $sales_list_total_qty;

    public $inventory_log_return_product;
    public $inventory_log_product_id;
    public $inventory_log_updated;

    public $connection;
    public $lastInsertedId;

    public $return_product_start;
    public $return_product_total;
    public $return_product_search;

    public $tblReturnProduct;
    public $tblProduct;
    public $tblInventoryLog;
    public $tblSalesList;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReturnProduct = "sccv2_return_product";
        $this->tblProduct = "sccv2_product";
        $this->tblInventoryLog = "sccv2_inventory_log";
        $this->tblSalesList = "sccv2_sales_list";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblReturnProduct} ";
            $sql .= "( return_product_id, ";
            $sql .= "return_product_date, ";
            $sql .= "return_product_sales_list_id, ";
            $sql .= "return_product_is_resolved, ";
            $sql .= "return_product_qty, ";
            $sql .= "return_product_remarks, ";
            $sql .= "return_product_is_refund, ";
            $sql .= "return_product_updated, ";
            $sql .= "return_product_created ) values ( ";
            $sql .= ":return_product_id, ";
            $sql .= ":return_product_date, ";
            $sql .= ":return_product_sales_list_id, ";
            $sql .= ":return_product_is_resolved, ";
            $sql .= ":return_product_qty, ";
            $sql .= ":return_product_remarks, ";
            $sql .= ":return_product_is_refund, ";
            $sql .= ":return_product_updated, ";
            $sql .= ":return_product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => $this->return_product_id,
                "return_product_date" => $this->return_product_date,
                "return_product_sales_list_id" => $this->return_product_sales_list_id,
                "return_product_is_resolved" => $this->return_product_is_resolved,
                "return_product_qty" => $this->return_product_qty,
                "return_product_remarks" => $this->return_product_remarks,
                "return_product_is_refund" => $this->return_product_is_refund,
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
            $sql .= "sl.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "and sl.sales_list_aid = rp.return_product_sales_list_id ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "DATE(rp.return_product_date) desc, ";
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
            $sql .= "sl.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "and sl.sales_list_aid = rp.return_product_sales_list_id ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "DATE(rp.return_product_date) desc, ";
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
            $sql .= "sl.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where rp.return_product_id = p.product_aid ";
            $sql .= "and sl.sales_list_aid = rp.return_product_sales_list_id ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or MONTHNAME(rp.return_product_date) like :month_name ";
            $sql .= "or MONTHNAME(rp.return_product_resolved_date) like :resolved_month_name ";
            $sql .= "or rp.return_product_date like :return_product_date ";
            $sql .= "or rp.return_product_resolved_date like :return_product_resolved_date ";
            $sql .= ") ";
            $sql .= "order by rp.return_product_is_resolved asc, ";
            $sql .= "DATE(rp.return_product_date) desc, ";
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
            $sql .= "return_product_sales_list_id = :return_product_sales_list_id, ";
            $sql .= "return_product_date = :return_product_date, ";
            $sql .= "return_product_qty = :return_product_qty, ";
            $sql .= "return_product_remarks = :return_product_remarks, ";
            $sql .= "return_product_is_refund = :return_product_is_refund, ";
            $sql .= "return_product_updated = :return_product_updated ";
            $sql .= "where return_product_aid = :return_product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => $this->return_product_id,
                "return_product_sales_list_id" => $this->return_product_sales_list_id,
                "return_product_date" => $this->return_product_date,
                "return_product_qty" => $this->return_product_qty,
                "return_product_remarks" => $this->return_product_remarks,
                "return_product_is_refund" => $this->return_product_is_refund,
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
            $sql .= "sl.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where rp.return_product_is_resolved = :return_product_is_resolved  ";
            $sql .= "and sl.sales_list_aid = rp.return_product_sales_list_id ";
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
            $sql .= "sl.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} as rp, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where rp.return_product_is_resolved = :return_product_is_resolved ";
            $sql .= "and sl.sales_list_aid = rp.return_product_sales_list_id ";
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

    // INVENTORY LOG ONLY
    // name
    public function checkReturnProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(return_product_qty) as total_return_product_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblReturnProduct} ";
            $sql .= "where return_product_id = :return_product_id ";
            $sql .= "and return_product_is_refund = '1' ";
            $sql .= "group by return_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "return_product_id" => $this->return_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Inventory Log
    public function updateInventoryReturnProduct()
    {
        try {
            $sql = "update {$this->tblInventoryLog} set ";
            $sql .= "inventory_log_return_product = :inventory_log_return_product, ";
            $sql .= "inventory_log_updated = :inventory_log_updated ";
            $sql .= "where inventory_log_product_id = :inventory_log_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "inventory_log_return_product" => $this->inventory_log_return_product,
                "inventory_log_updated" => $this->return_product_updated,
                "inventory_log_product_id" => $this->return_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Inventory Log
    public function updateSalesListRefund()
    {
        try {
            $sql = "update {$this->tblSalesList} set ";
            $sql .= "sales_list_return_qty = :sales_list_return_qty, ";
            $sql .= "sales_list_total_qty = :sales_list_total_qty, ";
            $sql .= "sales_list_updated = :sales_list_updated ";
            $sql .= "where sales_list_aid = :sales_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_return_qty" => $this->inventory_log_return_product,
                "sales_list_total_qty" => $this->sales_list_total_qty,
                "sales_list_updated" => $this->return_product_updated,
                "sales_list_aid" => $this->return_product_sales_list_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
