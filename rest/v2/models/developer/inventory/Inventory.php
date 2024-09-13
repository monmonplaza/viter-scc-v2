<?php
class Inventory
{
    public $inventory_log_aid;
    public $inventory_log_product_id;
    public $inventory_log_stock_in;
    public $inventory_log_stock_out;
    public $inventory_log_defective_product;
    public $inventory_log_return_product;
    public $inventory_log_updated;
    public $inventory_log_created;

    public $connection;
    public $lastInsertedId;

    public $inventory_log_start;
    public $inventory_log_total;
    public $inventory_log_search;

    public $tblInventoryLog;
    public $tblProduct;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblInventoryLog = "sccv2_inventory_log";
        $this->tblProduct = "sccv2_product";
    }

    // read all
    public function readAll()
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

    // read limit
    public function readLimit()
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
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->inventory_log_start - 1,
                "total" => $this->inventory_log_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
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
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or p.product_sku like :product_sku ";
            $sql .= ") ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_sku" => "%{$this->inventory_log_search}%",
                "product_name" => "%{$this->inventory_log_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
