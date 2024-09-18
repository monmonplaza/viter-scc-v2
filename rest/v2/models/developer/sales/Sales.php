<?php
class Sales
{
    public $sales_aid;
    public $sales_date;
    public $sales_reference_no;
    public $sales_total_amount;
    public $sales_is_paid;
    public $sales_payment_method;
    public $sales_updated;
    public $sales_created;

    public $inventory_log_updated;
    public $sales_supply_product_id;
    public $inventory_log_product_id;
    public $inventory_log_stock_out;
    public $inventory_log_defective_product;

    public $sales_list_product_id;

    public $connection;
    public $lastInsertedId;

    public $sales_start;
    public $sales_total;
    public $sales_search;

    public $tblSales;
    public $tblInventoryLog;
    public $tblProduct;
    public $tblSalesList;
    public $tblCustomer;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSales = "sccv2_sales";
        $this->tblSalesList = "sccv2_sales_list";
        $this->tblInventoryLog = "sccv2_inventory_log";
        $this->tblProduct = "sccv2_product";
        $this->tblCustomer = "sccv2_customer";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSales} ";
            $sql .= "( sales_date, ";
            $sql .= "sales_reference_no, ";
            $sql .= "sales_is_paid, ";
            $sql .= "sales_payment_method, ";
            $sql .= "sales_updated, ";
            $sql .= "sales_created ) values ( ";
            $sql .= ":sales_date, ";
            $sql .= ":sales_reference_no, ";
            $sql .= ":sales_is_paid, ";
            $sql .= ":sales_payment_method, ";
            $sql .= ":sales_updated, ";
            $sql .= ":sales_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => $this->sales_date,
                "sales_reference_no" => $this->sales_reference_no,
                "sales_is_paid" => $this->sales_is_paid,
                "sales_payment_method" => $this->sales_payment_method,
                "sales_updated" => $this->sales_updated,
                "sales_created" => $this->sales_created,
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
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
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
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->sales_start - 1,
                "total" => $this->sales_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "and (sales.sales_date like :sales_date ";
            $sql .= "or MONTHNAME(sales.sales_date) like :monthName ";
            $sql .= "or sales.sales_reference_no like :sales_reference_no ";
            $sql .= "or c.customer_name like :customer_name ";
            $sql .= ") ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => "%{$this->sales_search}%",
                "monthName" => "%{$this->sales_search}%",
                "sales_reference_no" => "%{$this->sales_search}%",
                "customer_name" => "%{$this->sales_search}%",
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
            $sql = "select * from {$this->tblSales} ";
            $sql .= "where sales_aid = :sales_aid ";
            $sql .= "order by sales_is_paid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_aid " => $this->sales_aid,
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
            $sql = "update {$this->tblSales} set ";
            $sql .= "sales_date = :sales_date, ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => $this->sales_date,
                "sales_aid" => $this->sales_aid,
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
            $sql = "update {$this->tblSales} set ";
            $sql .= "sales_is_paid = :sales_is_paid, ";
            $sql .= "sales_updated = :sales_updated ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_is_paid" => $this->sales_is_paid,
                "sales_updated" => $this->sales_updated,
                "sales_aid" => $this->sales_aid,
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
            $sql = "delete from {$this->tblSales} ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_aid" => $this->sales_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select * from {$this->tblSales} ";
            $sql .= "where sales_date = :sales_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => $this->sales_date
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByDate()
    {
        try {
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "and DATE(sales.sales_date) = DATE(:sales_date) ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => $this->sales_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "and sales.sales_is_paid = :sales_is_paid ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_is_paid" => $this->sales_is_paid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select sales.*, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCustomer} as c ";
            $sql .= "where c.customer_aid = sales.sales_customer_id ";
            $sql .= "and sales.sales_is_paid = :sales_is_paid ";
            $sql .= "and (sales.sales_date like :sales_date ";
            $sql .= "or MONTHNAME(sales.sales_date) like :monthName ";
            $sql .= "or sales.sales_reference_no like :sales_reference_no ";
            $sql .= "or c.customer_name like :customer_name ";
            $sql .= ") ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(sales.sales_date) desc, ";
            $sql .= "sales_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_date" => "%{$this->sales_search}%",
                "monthName" => "%{$this->sales_search}%",
                "sales_reference_no" => "%{$this->sales_search}%",
                "customer_name" => "%{$this->sales_search}%",
                "sales_is_paid" => $this->sales_is_paid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkInventoryLog()
    {
        try {
            $sql = "select il.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_sku, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblInventoryLog} as il, ";
            $sql .= "{$this->tblProduct} as p ";
            $sql .= "where il.inventory_log_product_id = p.product_aid ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkProductTotalQty()
    {
        try {
            $sql = "select ";
            $sql .= "s.sales_is_paid, ";
            $sql .= "sl.sales_list_product_id, ";
            $sql .= "SUM(sl.sales_list_quantity) as total_product_stock_qty ";
            $sql .= "from ";
            $sql .= "{$this->tblSalesList} as sl, ";
            $sql .= "{$this->tblSales} as s ";
            $sql .= "where sl.sales_list_sales_id = s.sales_aid ";
            $sql .= "and s.sales_is_paid = '1' ";
            $sql .= "and sl.sales_list_product_id = :sales_list_product_id ";
            $sql .= "group by sl.sales_list_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_product_id" => $this->sales_list_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Inventory Log
    public function updateInventoryStockOut()
    {
        try {
            $sql = "update {$this->tblInventoryLog} set ";
            $sql .= "inventory_log_stock_out = :inventory_log_stock_out, ";
            $sql .= "inventory_log_updated = :inventory_log_updated ";
            $sql .= "where inventory_log_product_id = :inventory_log_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "inventory_log_stock_out" => $this->inventory_log_stock_out,
                "inventory_log_updated" => $this->inventory_log_updated,
                "inventory_log_product_id" => $this->inventory_log_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function checkAssociation()
    {
        try {
            $sql = "select sales_list_sales_id ";
            $sql .= "from ";
            $sql .= "{$this->tblSalesList} ";
            $sql .= "where sales_list_sales_id = :sales_list_sales_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_sales_id" => "{$this->sales_aid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
