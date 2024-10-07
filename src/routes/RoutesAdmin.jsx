import { devNavUrl, urlAdmin } from "@/components/helpers/functions-general";
import OtherProtectedRoute from "@/components/pages/access/OtherProtectedRoute.jsx";
import Account from "@/components/pages/admin/account/Account.jsx";
import Customers from "@/components/pages/developer/customers/Customers";
import DefectiveProduct from "@/components/pages/developer/defective-product/DefectiveProduct";
import Inventory from "@/components/pages/developer/inventory/Inventory.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import PettyCash from "@/components/pages/developer/petty-cash/PettyCash";
import ProductPrice from "@/components/pages/developer/product-price/ProductPrice";
import Product from "@/components/pages/developer/product/Product.jsx";
import Purchase from "@/components/pages/developer/purchase/Purchase";
import Receiving from "@/components/pages/developer/receiving/Receiving.jsx";
import ReturnProduct from "@/components/pages/developer/return-product/ReturnProduct";
import Sales from "@/components/pages/developer/sales/Sales";
import Settings from "@/components/pages/developer/settings/Settings";
import Unit from "@/components/pages/developer/settings/unit/Unit";
import Supplier from "@/components/pages/developer/supplier/Supplier.jsx";

export const routesAdmin = [
  {
    path: `${devNavUrl}/${urlAdmin}/account`,
    element: (
      <OtherProtectedRoute>
        <Account />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlAdmin}/overview`,
    element: (
      <OtherProtectedRoute>
        <Overview />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/inventory`,
    element: (
      <OtherProtectedRoute>
        <Inventory />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/receiving`,
    element: (
      <OtherProtectedRoute>
        <Receiving />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/defective-product`,
    element: (
      <OtherProtectedRoute>
        <DefectiveProduct />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/sales`,
    element: (
      <OtherProtectedRoute>
        <Sales />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/products`,
    element: (
      <OtherProtectedRoute>
        <Product />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/product-price`,
    element: (
      <OtherProtectedRoute>
        {" "}
        <ProductPrice />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/suppliers`,
    element: (
      <OtherProtectedRoute>
        {" "}
        <Supplier />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/customers`,
    element: (
      <OtherProtectedRoute>
        {" "}
        <Customers />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/return-product`,
    element: (
      <OtherProtectedRoute>
        <ReturnProduct />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlAdmin}/unit`,
    element: (
      <OtherProtectedRoute>
        {" "}
        <Unit />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlAdmin}/settings`,
    element: (
      <OtherProtectedRoute>
        <Settings />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlAdmin}/purchase`,
    element: (
      <OtherProtectedRoute>
        <Purchase />
      </OtherProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlAdmin}/petty-cash`,
    element: (
      <OtherProtectedRoute>
        <PettyCash />
      </OtherProtectedRoute>
    ),
  },
];
