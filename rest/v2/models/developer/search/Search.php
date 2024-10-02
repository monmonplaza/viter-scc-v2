<?php
class Search
{
    public $connection;
    public $lastInsertedId;

    public $search;
    public $sales_list_sales_id;

    public $tblProduct;
    public $tblSupplier;
    public $tblCategory;
    public $tblReceiving;
    public $tblReceivingSupply;
    public $tblProductPrice;
    public $tblCustomer;
    public $tblSalesList;
    public $tblSales;
    public $tblUnit;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv2_product";
        $this->tblCategory = "sccv2_category";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblReceiving = "sccv2_receiving";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblProductPrice = "sccv2_product_price";
        $this->tblCustomer = "sccv2_customer";
        $this->tblSalesList = "sccv2_sales_list";
        $this->tblSales = "sccv2_sales";
        $this->tblUnit = "sccv2_settings_unit";
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

    public function searchCustomer()
    {
        try {
            $sql = "select * from {$this->tblCustomer} ";
            $sql .= "where customer_name like :customer_name ";
            $sql .= "order by customer_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "customer_name" => "%{$this->search}%",
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

    public function searchProductPrice()
    {
        try {
            $sql = "select ";
            $sql .= "product.*, ";
            $sql .= "pr.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "rs.receiving_supply_barcode, ";
            $sql .= "rs.receiving_supply_defective_product_qty, ";
            $sql .= "category.category_aid, ";
            $sql .= "category.category_name, ";
            $sql .= "category.category_description ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where product.product_category_id = category.category_aid ";
            $sql .= "and rs.receiving_supply_product_id = product.product_aid ";
            $sql .= "and pr.product_price_product_id = product.product_aid ";
            $sql .= "and pr.product_price_product_id = rs.receiving_supply_product_id ";
            $sql .= "and pr.product_price_supply_id = rs.receiving_supply_aid ";
            $sql .= "and rs.receiving_supply_unit_id = u.settings_unit_aid  ";
            $sql .= "and cast(pr.product_price_available_stock as decimal(20,4)) > 0 ";
            $sql .= "and ( ";
            $sql .= "product.product_name like :product_name ";
            $sql .= "or category.category_name like :category_name ";
            $sql .= "or rs.receiving_supply_barcode like :receiving_supply_barcode ";
            $sql .= ") ";
            $sql .= "order by product.product_is_active desc, ";
            $sql .= "product.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => "%{$this->search}%",
                "product_name" => "%{$this->search}%",
                "receiving_supply_barcode" => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function seachProductReceiveSupply()
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

    // read all
    public function seachAllProductReceiveSupply()
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

    // read all
    public function searchSalesListProduct()
    {
        try {
            $sql = "select ";
            $sql .= "sl.sales_list_quantity, ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl ";
            $sql .= "where p.product_aid = sl.sales_list_product_id ";
            $sql .= "and sl.sales_list_sales_id = :sales_list_sales_id ";
            $sql .= "and p.product_name like :product_name ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "%{$this->search}%",
                "sales_list_sales_id" => $this->sales_list_sales_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function searchReferenceNo()
    {
        try {
            $sql = "select ";
            $sql .= "p.product_aid, ";
            $sql .= "p.product_name, ";
            $sql .= "s.sales_aid, ";
            $sql .= "s.sales_reference_no, ";
            $sql .= "c.customer_name ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSalesList} as sl, ";
            $sql .= "{$this->tblCustomer} as c, ";
            $sql .= "{$this->tblSales} as s ";
            $sql .= "where p.product_aid = sl.sales_list_product_id ";
            $sql .= "and sl.sales_list_sales_id = s.sales_aid ";
            $sql .= "and c.customer_aid = s.sales_customer_id ";
            $sql .= "and (s.sales_reference_no like :sales_reference_no ";
            $sql .= "or c.customer_name like :customer_name ";
            $sql .= ") ";
            $sql .= "group by sl.sales_list_sales_id ";
            $sql .= "order by p.product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_reference_no" => "%{$this->search}%",
                "customer_name" => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
