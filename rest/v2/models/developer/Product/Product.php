<?php
class Product
{
    public $product_aid;
    public $product_sku;
    public $product_name;
    public $product_description;
    public $product_category_id;
    public $product_barcode;
    public $product_is_active;
    public $product_datetime;
    public $product_created;

    public $connection;
    public $lastInsertedId;

    public $product_start;
    public $product_total;
    public $product_search;

    public $tblProduct;
    public $tblCategory;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv2_product";
        $this->tblCategory = "sccv2_category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_name, ";
            $sql .= "product_description, ";
            $sql .= "product_category_id, ";
            $sql .= "product_barcode, ";
            $sql .= "product_is_active, ";
            $sql .= "product_datetime, ";
            $sql .= "product_created ) values ( ";
            $sql .= ":product_name, ";
            $sql .= ":product_description, ";
            $sql .= ":product_category_id, ";
            $sql .= ":product_barcode, ";
            $sql .= ":product_is_active, ";
            $sql .= ":product_datetime, ";
            $sql .= ":product_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_description" => $this->product_description,
                "product_category_id" => $this->product_category_id,
                "product_barcode" => $this->product_barcode,
                "product_is_active" => $this->product_is_active,
                "product_datetime" => $this->product_datetime,
                "product_created" => $this->product_created,
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
            $sql .= "product.*, ";
            $sql .= "category.category_aid, ";
            $sql .= "category.category_name, ";
            $sql .= "category.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where product.product_category_id = category.category_aid ";
            $sql .= "order by product.product_is_active desc, ";
            $sql .= "product.product_name asc ";
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
            $sql .= "product.*, ";
            $sql .= "category.category_aid, ";
            $sql .= "category.category_name, ";
            $sql .= "category.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where product.product_category_id = category.category_aid ";
            $sql .= "order by product.product_is_active desc, ";
            $sql .= "product.product_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_start - 1,
                "total" => $this->product_total,
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
                "category_name" => "%{$this->product_search}%",
                "product_name" => "%{$this->product_search}%",
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
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "where product_aid  = :product_aid ";
            $sql .= "order by product_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
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
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_name = :product_name, ";
            $sql .= "product_category_id = :product_category_id, ";
            $sql .= "product_barcode = :product_barcode, ";
            $sql .= "product_description = :product_description, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_category_id" => $this->product_category_id,
                "product_barcode" => $this->product_barcode,
                "product_description" => $this->product_description,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->product_aid,
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
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_is_active = :product_is_active, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_is_active" => $this->product_is_active,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->product_aid,
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
            $sql = "delete from {$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
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
            $sql = "select product_name from {$this->tblProduct} ";
            $sql .= "where product_name = :product_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "{$this->product_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where product_is_active = :product_is_active  ";
            $sql .= "order by product_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_is_active" => $this->product_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where ";
            $sql .= "product_is_active = :product_is_active ";
            $sql .= "and product_name like :product_name ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->product_search}%",
                "product_is_active" => $this->product_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAllCategory()
    {
        try {
            $sql = "select * from {$this->tblCategory} ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // update
    public function updateProductSKUByLastInsertedId()
    {
        try {
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_sku = :product_sku, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_sku" => $this->product_sku . $this->lastInsertedId,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->lastInsertedId,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
