<?php
class Search
{
    public $connection;
    public $lastInsertedId;

    public $search;

    public $tblProduct;
    public $tblSupplier;
    public $tblCategory;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv2_product";
        $this->tblCategory = "sccv2_category";
        $this->tblSupplier = "sccv2_supplier";
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
}
