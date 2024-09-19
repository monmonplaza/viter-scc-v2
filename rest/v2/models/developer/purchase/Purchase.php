<?php
class Purchase
{
    public $purchase_aid;
    public $purchase_is_ongoing;
    public $purchase_product_id;
    public $purchase_date;
    public $purchase_quantity;
    public $purchase_delivery_date;
    public $purchase_remarks;
    public $purchase_price;
    public $purchase_supplier_id;
    public $purchase_unit_id;
    public $purchase_reference_no;
    public $purchase_is_new_data;
    public $purchase_updated;
    public $purchase_created;

    public $product_name;

    public $inventory_log_return_product;
    public $inventory_log_product_id;
    public $inventory_log_updated;

    public $connection;
    public $lastInsertedId;

    public $purchase_start;
    public $purchase_total;
    public $purchase_search;

    public $tblPurchase;
    public $tblProduct;
    public $tblSupplier;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPurchase = "sccv2_purchase";
        $this->tblProduct = "sccv2_product";
        $this->tblSupplier = "sccv2_supplier";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPurchase} ";
            $sql .= "( purchase_product_id, ";
            $sql .= "purchase_delivery_date, ";
            $sql .= "purchase_date, ";
            $sql .= "purchase_price, ";
            $sql .= "purchase_is_ongoing, ";
            $sql .= "purchase_quantity, ";
            $sql .= "purchase_supplier_id, ";
            $sql .= "purchase_unit_id, ";
            $sql .= "purchase_reference_no, ";
            $sql .= "purchase_is_new_data, ";
            $sql .= "purchase_updated, ";
            $sql .= "purchase_created ) values ( ";
            $sql .= ":purchase_product_id, ";
            $sql .= ":purchase_delivery_date, ";
            $sql .= ":purchase_date, ";
            $sql .= ":purchase_price, ";
            $sql .= ":purchase_is_ongoing, ";
            $sql .= ":purchase_quantity, ";
            $sql .= ":purchase_supplier_id, ";
            $sql .= ":purchase_unit_id, ";
            $sql .= ":purchase_reference_no, ";
            $sql .= ":purchase_is_new_data, ";
            $sql .= ":purchase_updated, ";
            $sql .= ":purchase_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_product_id" => $this->purchase_product_id,
                "purchase_delivery_date" => $this->purchase_delivery_date,
                "purchase_date" => $this->purchase_date,
                "purchase_price" => $this->purchase_price,
                "purchase_is_ongoing" => $this->purchase_is_ongoing,
                "purchase_quantity" => $this->purchase_quantity,
                "purchase_supplier_id" => $this->purchase_supplier_id,
                "purchase_unit_id" => $this->purchase_unit_id,
                "purchase_reference_no" => $this->purchase_reference_no,
                "purchase_is_new_data" => $this->purchase_is_new_data,
                "purchase_updated" => $this->purchase_updated,
                "purchase_created" => $this->purchase_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readGroupByReferenceNo()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "group by purc.purchase_reference_no ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readGroupByReferenceNoLimit()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "group by purc.purchase_reference_no ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->purchase_start - 1,
                "total" => $this->purchase_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAllNewData()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and purc.purchase_is_new_data = '1' ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAllByReferenceNo()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and purc.purchase_reference_no = :purchase_reference_no ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_reference_no" => $this->purchase_reference_no,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all
    public function readAll()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
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
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->purchase_start - 1,
                "total" => $this->purchase_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or MONTHNAME(purc.purchase_date) like :month_name ";
            $sql .= "or MONTHNAME(purc.purchase_delivery_date) like :delivery_date_month_name ";
            $sql .= "or purc.purchase_date like :purchase_date ";
            $sql .= "or purc.purchase_delivery_date like :purchase_delivery_date ";
            $sql .= "or s.supplier_name like :supplier_name ";
            $sql .= ") ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->purchase_search}%",
                "month_name" => "%{$this->purchase_search}%",
                "delivery_date_month_name" => "%{$this->purchase_search}%",
                "purchase_date" => "%{$this->purchase_search}%",
                "purchase_delivery_date" => "%{$this->purchase_search}%",
                "supplier_name" => "%{$this->purchase_search}%",
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
            $sql = "select * from {$this->tblPurchase} ";
            $sql .= "where purchase_aid = :purchase_aid ";
            $sql .= "order by purchase_is_ongoing desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_aid" => $this->purchase_aid,
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
            $sql = "update {$this->tblPurchase} set ";
            $sql .= "purchase_product_id = :purchase_product_id, ";
            $sql .= "purchase_date = :purchase_date, ";
            $sql .= "purchase_quantity = :purchase_quantity, ";
            $sql .= "purchase_remarks = :purchase_remarks, ";
            $sql .= "purchase_updated = :purchase_updated ";
            $sql .= "where purchase_aid = :purchase_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_product_id" => $this->purchase_product_id,
                "purchase_date" => $this->purchase_date,
                "purchase_quantity" => $this->purchase_quantity,
                "purchase_remarks" => $this->purchase_remarks,
                "purchase_updated" => $this->purchase_updated,
                "purchase_aid" => $this->purchase_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updatePurchaseDate()
    {
        try {
            $sql = "update {$this->tblPurchase} set ";
            $sql .= "purchase_delivery_date = :purchase_delivery_date, ";
            $sql .= "purchase_date = :purchase_date, ";
            $sql .= "purchase_updated = :purchase_updated ";
            $sql .= "where purchase_reference_no = :purchase_reference_no ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_delivery_date" => $this->purchase_delivery_date,
                "purchase_date" => $this->purchase_date,
                "purchase_updated" => $this->purchase_updated,
                "purchase_reference_no" => $this->purchase_reference_no,
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
            $sql = "update {$this->tblPurchase} set ";
            $sql .= "purchase_is_ongoing = :purchase_is_ongoing, ";
            $sql .= "purchase_updated = :purchase_updated ";
            $sql .= "where purchase_aid = :purchase_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_is_ongoing" => $this->purchase_is_ongoing,
                "purchase_updated" => $this->purchase_updated,
                "purchase_aid" => $this->purchase_aid,
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
            $sql = "delete from {$this->tblPurchase} ";
            $sql .= "where purchase_aid = :purchase_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_aid" => $this->purchase_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function filterByDate()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and ( ";
            $sql .= "DATE(purc.purchase_date) = DATE(:purchase_date) ";
            $sql .= "and DATE(purc.purchase_delivery_date) = DATE(:purchase_delivery_date) ";
            $sql .= " ) ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_date" => $this->purchase_date,
                "purchase_delivery_date" => $this->purchase_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and purc.purchase_is_ongoing = :purchase_is_ongoing ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "purchase_is_ongoing" => $this->purchase_is_ongoing,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select purc.*, ";
            $sql .= "s.supplier_aid, ";
            $sql .= "s.supplier_name, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblPurchase} as purc, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as s ";
            $sql .= "where purc.purchase_product_id = p.product_aid ";
            $sql .= "and purc.purchase_supplier_id = s.supplier_aid ";
            $sql .= "and purc.purchase_is_ongoing = :purchase_is_ongoing ";
            $sql .= "and (p.product_name like :product_name ";
            $sql .= "or MONTHNAME(purc.purchase_date) like :month_name ";
            $sql .= "or MONTHNAME(purc.purchase_delivery_date) like :delivery_date_month_name ";
            $sql .= "or purc.purchase_date like :purchase_date ";
            $sql .= "or purc.purchase_delivery_date like :purchase_delivery_date ";
            $sql .= "or s.supplier_name like :supplier_name ";
            $sql .= ") ";
            $sql .= "order by purc.purchase_is_ongoing asc, ";
            $sql .= "DATE(purc.purchase_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->purchase_search}%",
                "month_name" => "%{$this->purchase_search}%",
                "delivery_date_month_name" => "%{$this->purchase_search}%",
                "purchase_date" => "%{$this->purchase_search}%",
                "purchase_delivery_date" => "%{$this->purchase_search}%",
                "supplier_name" => "%{$this->purchase_search}%",
                "purchase_is_ongoing" => $this->purchase_is_ongoing,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
