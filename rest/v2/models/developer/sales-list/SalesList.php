<?php
class SalesList
{
    public $sales_list_aid;
    public $sales_list_sales_id;
    public $sales_list_product_id;
    public $sales_list_customer_id;
    public $sales_list_quantity;
    public $sales_list_price;
    public $sales_list_date;
    public $sales_list_updated;
    public $sales_list_created;

    public $sales_aid;
    public $sales_customer_id;
    public $sales_date;
    public $sales_reference_no;
    public $sales_total_amount;
    public $sales_is_paid;
    public $sales_payment_method;
    public $sales_created;
    public $sales_updated;

    public $connection;
    public $lastInsertedId;

    public $sales_list_start;
    public $sales_list_total;
    public $sales_list_search;

    public $tblSalesList;
    public $tblSales;
    public $tblReceivingSupply;
    public $tblProduct;
    public $tblSupplier;
    public $tblReceiving;
    public $tblUnit;
    public $tblDefectiveProduct;
    public $tblInventoryLog;
    public $tblProductPrice;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSalesList = "sccv2_sales_list";
        $this->tblSales = "sccv2_sales";
        $this->tblReceivingSupply = "sccv2_receiving_supply";
        $this->tblProduct = "sccv2_product";
        $this->tblSupplier = "sccv2_supplier";
        $this->tblReceiving = "sccv2_receiving";
        $this->tblUnit = "sccv2_settings_unit";
        $this->tblDefectiveProduct = "sccv2_defective_product";
        $this->tblInventoryLog = "sccv2_inventory_log";
        $this->tblProductPrice = "sccv2_product_price";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSalesList} ";
            $sql .= "( sales_list_aid, ";
            $sql .= "sales_list_sales_id, ";
            $sql .= "sales_list_product_id, ";
            $sql .= "sales_list_customer_id, ";
            $sql .= "sales_list_quantity, ";
            $sql .= "sales_list_price, ";
            $sql .= "sales_list_date, ";
            $sql .= "sales_list_updated, ";
            $sql .= "sales_list_created, ";
            $sql .= "sales_list_updated, ";
            $sql .= "sales_list_created ) values ( ";
            $sql .= ":sales_list_aid, ";
            $sql .= ":sales_list_sales_id, ";
            $sql .= ":sales_list_product_id, ";
            $sql .= ":sales_list_customer_id, ";
            $sql .= ":sales_list_quantity, ";
            $sql .= ":sales_list_price, ";
            $sql .= ":sales_list_date, ";
            $sql .= ":sales_list_updated, ";
            $sql .= ":sales_list_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_aid" => $this->sales_list_aid,
                "sales_list_sales_id" => $this->sales_list_sales_id,
                "sales_list_product_id" => $this->sales_list_product_id,
                "sales_list_customer_id" => $this->sales_list_customer_id,
                "sales_list_quantity" => $this->sales_list_quantity,
                "sales_list_price" => $this->sales_list_price,
                "sales_list_date" => $this->sales_list_date,
                "sales_list_updated" => $this->sales_list_updated,
                "sales_list_created" => $this->sales_list_created,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function createSales()
    {
        try {
            $sql = "insert into {$this->tblSales} ";
            $sql .= "( sales_customer_id, ";
            $sql .= "sales_date, ";
            $sql .= "sales_reference_no, ";
            $sql .= "sales_total_amount, ";
            $sql .= "sales_is_paid, ";
            $sql .= "sales_payment_method, ";
            $sql .= "sales_created, ";
            $sql .= "sales_updated ) values ( ";
            $sql .= ":sales_customer_id, ";
            $sql .= ":sales_date, ";
            $sql .= ":sales_reference_no, ";
            $sql .= ":sales_total_amount, ";
            $sql .= ":sales_is_paid, ";
            $sql .= ":sales_payment_method, ";
            $sql .= ":sales_created, ";
            $sql .= ":sales_updated ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_customer_id" => $this->sales_customer_id,
                "sales_date" => $this->sales_date,
                "sales_reference_no" => $this->sales_reference_no,
                "sales_total_amount" => $this->sales_total_amount,
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
            $sql = "select rs.*, ";
            $sql .= "pr.*, ";
            $sql .= "sl.*, ";
            $sql .= "sale.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "sup.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as sup, ";
            $sql .= "{$this->tblSalesList} as sl, ";
            $sql .= "{$this->tblSales} as sale ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and rs.receiving_supply_aid = pr.product_price_supply_id ";
            $sql .= "and rs.receiving_supply_product_id = pr.product_price_supply_id ";
            $sql .= "and p.product_aid = pr.product_price_supply_id ";
            $sql .= "and sl.sales_list_product_id = p.product_aid ";
            $sql .= "and sale.sales_aid = sl.sales_list_sales_id ";
            $sql .= "and sup.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.sales_list_aid desc ";
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
            $sql = "select rs.*, ";
            $sql .= "pr.*, ";
            $sql .= "sl.*, ";
            $sql .= "sale.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "sup.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as sup, ";
            $sql .= "{$this->tblSalesList} as sl, ";
            $sql .= "{$this->tblSales} as sale ";
            $sql .= "where p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and rs.receiving_supply_aid = pr.product_price_supply_id ";
            $sql .= "and rs.receiving_supply_product_id = pr.product_price_supply_id ";
            $sql .= "and p.product_aid = pr.product_price_supply_id ";
            $sql .= "and sl.sales_list_product_id = p.product_aid ";
            $sql .= "and sale.sales_aid = sl.sales_list_sales_id ";
            $sql .= "and sup.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.sales_list_aid desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->sales_list_start - 1,
                "total" => $this->sales_list_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readById()
    {
        try {
            $sql = "select rs.*, ";
            $sql .= "pr.*, ";
            $sql .= "sl.*, ";
            $sql .= "sale.*, ";
            $sql .= "u.settings_unit_name, ";
            $sql .= "p.product_name, ";
            $sql .= "sup.supplier_name ";
            $sql .= "from ";
            $sql .= "{$this->tblReceivingSupply} as rs, ";
            $sql .= "{$this->tblUnit} as u, ";
            $sql .= "{$this->tblProductPrice} as pr, ";
            $sql .= "{$this->tblProduct} as p, ";
            $sql .= "{$this->tblSupplier} as sup, ";
            $sql .= "{$this->tblSalesList} as sl, ";
            $sql .= "{$this->tblSales} as sale ";
            $sql .= "where sale.sales_aid  = :sales_aid ";
            $sql .= "and p.product_aid = rs.receiving_supply_product_id ";
            $sql .= "and p.product_aid = pr.product_price_product_id ";
            $sql .= "and rs.receiving_supply_aid = pr.product_price_supply_id ";
            $sql .= "and rs.receiving_supply_product_id = pr.product_price_supply_id ";
            $sql .= "and p.product_aid = pr.product_price_supply_id ";
            $sql .= "and sl.sales_list_product_id = p.product_aid ";
            $sql .= "and sale.sales_aid = sl.sales_list_sales_id ";
            $sql .= "and sup.supplier_aid = rs.receiving_supply_supplier_id ";
            $sql .= "and u.settings_unit_aid = rs.receiving_supply_unit_id ";
            $sql .= "order by rs.sales_list_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_aid" => $this->sales_aid,
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
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "sales_list_quantity = :sales_list_quantity, ";
            $sql .= "sales_list_updated = :sales_list_updated ";
            $sql .= "where sales_list_aid = :sales_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_list_quantity" => $this->sales_list_quantity,
                "sales_list_updated" => $this->sales_list_updated,
                "sales_list_aid" => $this->sales_list_aid,
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
            $sql = "update {$this->tblReceivingSupply} set ";
            $sql .= "receiving_supply_is_active = :receiving_supply_is_active, ";
            $sql .= "sales_list_updated = :sales_list_updated ";
            $sql .= "where sales_list_aid  = :sales_list_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "receiving_supply_is_active" => $this->receiving_supply_is_active,
                "sales_list_updated" => $this->sales_list_updated,
                "sales_list_aid" => $this->sales_list_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
