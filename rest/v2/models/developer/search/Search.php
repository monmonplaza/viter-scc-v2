<?php
class Search
{
    public $connection;
    public $lastInsertedId;

    public $search;

    public $tblProduct;
    public $tblSupplier;
    public $tblCategory;
    public $tblReceiving;
    public $tblReceivingSupply;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv2_product";
        $this->tblCategory = "sccv2_category";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblReceiving = "sccv2_receiving";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
    }

    public function searchSupplier()
    {
        try {
            $sql = "select * from {$this->tblSupplier} ";
            $sql .= "where supplier_name like :supplier_name ";
            $sql .= "order by supplier_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supplier_name" => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchProduct()
    {
        try {
            $sql = "select ";
            $sql .= "product.*, ";
            $sql .= "category.category_aid, ";
            $sql .= "category.category_name, ";
            $sql .= "category.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where product.product_category_id = category.category_aid ";
            $sql .= "and ( ";
            $sql .= "product.product_name like :product_name ";
            $sql .= "or category.category_name like :category_name ";
            $sql .= ") ";
            $sql .= "order by product.product_is_active desc, ";
            $sql .= "product.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => "%{$this->search}%",
                "product_name" => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read all
    public function SeachProductReceiveSupply()
    {
        try {
            $sql = "select ";
            $sql .= "rs.*, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "c.category_aid, ";
            $sql .= "c.category_name, ";
            $sql .= "c.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblReceiving} as r, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where p.product_category_id = c.category_aid ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and r.receiving_aid = rs.receiving_supply_received_id ";
            $sql .= "and r.receiving_is_complete = '1' ";
            $sql .= "and rs.receiving_supply_have_price = '0' ";
            $sql .= "and rs.receiving_supply_is_active = '1' ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or rs.receiving_supply_barcode like :receiving_supply_barcode ";
            $sql .= ") ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->search}%",
                "receiving_supply_barcode" => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
