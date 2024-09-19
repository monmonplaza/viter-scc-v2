<?php
class ProductPrice
{
    public $product_price_aid;
    public $product_price_product_id;
    public $product_price_supply_id;
    public $product_price_scc_price;
    public $product_price_scc_percent;
    public $product_price_amount;
    public $product_price_percent;
    public $product_price_whole_sale_amount;
    public $product_price_whole_sale_percent;
    public $product_price_scc_whole_sale_amount;
    public $product_price_scc_whole_sale_percent;
    public $product_price_stock_in;
    public $product_price_stock_out;
    public $product_price_available_stock;
    public $product_price_remarks;
    public $product_price_update;
    public $product_price_created;

    public $receiving_supply_have_price;

    public $connection;
    public $lastInsertedId;
    public $product_price_start;
    public $product_price_total;
    public $product_price_search;

    public $tblProductPrice;
    public $tblProduct;
    public $tblReceivingSupply;
    public $tblCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProductPrice = "sccv2_product_price";
        $this->tblProduct = "sccv2_product";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblCategory = "sccv2_category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProductPrice} ";
            $sql .= "( product_price_product_id, ";
            $sql .= "product_price_supply_id, ";
            $sql .= "product_price_scc_price, ";
            $sql .= "product_price_scc_percent, ";
            $sql .= "product_price_amount, ";
            $sql .= "product_price_percent, ";
            $sql .= "product_price_whole_sale_amount, ";
            $sql .= "product_price_whole_sale_percent, ";
            $sql .= "product_price_scc_whole_sale_amount, ";
            $sql .= "product_price_scc_whole_sale_percent, ";
            $sql .= "product_price_stock_in, ";
            $sql .= "product_price_stock_out, ";
            $sql .= "product_price_available_stock, ";
            $sql .= "product_price_remarks, ";
            $sql .= "product_price_update, ";
            $sql .= "product_price_created ) values ( ";
            $sql .= ":product_price_product_id, ";
            $sql .= ":product_price_supply_id, ";
            $sql .= ":product_price_scc_price, ";
            $sql .= ":product_price_scc_percent, ";
            $sql .= ":product_price_amount, ";
            $sql .= ":product_price_percent, ";
            $sql .= ":product_price_whole_sale_amount, ";
            $sql .= ":product_price_whole_sale_percent, ";
            $sql .= ":product_price_scc_whole_sale_amount, ";
            $sql .= ":product_price_scc_whole_sale_percent, ";
            $sql .= ":product_price_stock_in, ";
            $sql .= ":product_price_stock_out, ";
            $sql .= ":product_price_available_stock, ";
            $sql .= ":product_price_remarks, ";
            $sql .= ":product_price_update, ";
            $sql .= ":product_price_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_product_id" => $this->product_price_product_id,
                "product_price_supply_id" => $this->product_price_supply_id,
                "product_price_scc_price" => $this->product_price_scc_price,
                "product_price_scc_percent" => $this->product_price_scc_percent,
                "product_price_amount" => $this->product_price_amount,
                "product_price_percent" => $this->product_price_percent,
                "product_price_whole_sale_amount" => $this->product_price_whole_sale_amount,
                "product_price_whole_sale_percent" => $this->product_price_whole_sale_percent,
                "product_price_scc_whole_sale_amount" => $this->product_price_scc_whole_sale_amount,
                "product_price_scc_whole_sale_percent" => $this->product_price_scc_whole_sale_percent,
                "product_price_stock_in" => $this->product_price_stock_in,
                "product_price_stock_out" => $this->product_price_stock_out,
                "product_price_available_stock" => $this->product_price_available_stock,
                "product_price_remarks" => $this->product_price_remarks,
                "product_price_update" => $this->product_price_update,
                "product_price_created" => $this->product_price_created,
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
            $sql .= "pr.*, ";
            $sql .= "rs.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "c.category_aid, ";
            $sql .= "c.category_name, ";
            $sql .= "c.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where p.product_category_id = c.category_aid ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_product_id = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_supply_id = rs.receiving_supply_aid ";
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
            $sql = "select ";
            $sql .= "pr.*, ";
            $sql .= "rs.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "c.category_aid, ";
            $sql .= "c.category_name, ";
            $sql .= "c.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where p.product_category_id = c.category_aid ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_product_id = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_supply_id = rs.receiving_supply_aid ";
            $sql .= "order by p.product_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_price_start - 1,
                "total" => $this->product_price_total,
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
            $sql .= "pr.*, ";
            $sql .= "rs.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "c.category_aid, ";
            $sql .= "c.category_name, ";
            $sql .= "c.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where p.product_category_id = c.category_aid ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_product_id = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_supply_id = rs.receiving_supply_aid ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or rs.receiving_supply_barcode like :receiving_supply_barcode ";
            $sql .= ") ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->product_price_search}%",
                "receiving_supply_barcode" => "%{$this->product_price_search}%",
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
            $sql = "select ";
            $sql .= "pr.*, ";
            $sql .= "rs.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "c.category_aid, ";
            $sql .= "c.category_name, ";
            $sql .= "c.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where pr.product_price_aid = :product_price_aid ";
            $sql .= "and p.product_category_id = c.category_aid ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_product_id = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_supply_id = rs.receiving_supply_aid ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_aid" => $this->product_price_aid,
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
            $sql = "update {$this->tblProductPrice} set ";
            $sql .= "product_price_scc_price = :product_price_scc_price, ";
            $sql .= "product_price_scc_percent = :product_price_scc_percent, ";
            $sql .= "product_price_amount = :product_price_amount, ";
            $sql .= "product_price_percent = :product_price_percent, ";
            $sql .= "product_price_whole_sale_amount = :product_price_whole_sale_amount, ";
            $sql .= "product_price_whole_sale_percent = :product_price_whole_sale_percent, ";
            $sql .= "product_price_scc_whole_sale_amount = :product_price_scc_whole_sale_amount, ";
            $sql .= "product_price_scc_whole_sale_percent = :product_price_scc_whole_sale_percent, ";
            $sql .= "product_price_stock_out = :product_price_stock_out, ";
            $sql .= "product_price_remarks = :product_price_remarks, ";
            $sql .= "product_price_update = :product_price_update ";
            $sql .= "where product_price_aid = :product_price_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_scc_price" => $this->product_price_scc_price,
                "product_price_scc_percent" => $this->product_price_scc_percent,
                "product_price_amount" => $this->product_price_amount,
                "product_price_percent" => $this->product_price_percent,
                "product_price_whole_sale_amount" => $this->product_price_whole_sale_amount,
                "product_price_whole_sale_percent" => $this->product_price_whole_sale_percent,
                "product_price_scc_whole_sale_amount" => $this->product_price_scc_whole_sale_amount,
                "product_price_scc_whole_sale_percent" => $this->product_price_scc_whole_sale_percent,
                "product_price_stock_out" => $this->product_price_stock_out,
                "product_price_remarks" => $this->product_price_remarks,
                "product_price_update" => $this->product_price_update,
                "product_price_aid" => $this->product_price_aid,
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
            $sql = "delete from {$this->tblProductPrice} ";
            $sql .= "where product_price_aid = :product_price_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_aid" => $this->product_price_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkStockOut()
    {
        try {
            $sql = "select product_price_stock_out from {$this->tblProductPrice} ";
            $sql .= "where product_price_stock_out != '0' ";
            $sql .= "and product_price_aid = :product_price_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_aid" => $this->product_price_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkReceivingSupply()
    {
        try {
            $sql = "select product_price_supply_id from {$this->tblProductPrice} ";
            $sql .= "where product_price_supply_id = :product_price_supply_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_price_supply_id" => $this->product_price_supply_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function havePrice()
    {
        try {
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "receiving_supply_have_price = :receiving_supply_have_price, ";
            $sql .= "receiving_supply_datetime = :receiving_supply_datetime ";
            $sql .= "where receiving_supply_aid = :receiving_supply_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_have_price" => $this->receiving_supply_have_price,
                "receiving_supply_datetime" => $this->product_price_update,
                "receiving_supply_aid" => $this->product_price_supply_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
