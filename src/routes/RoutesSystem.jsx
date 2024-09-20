import { devNavUrl, urlSystem } from "@/components/helpers/functions-general";
import DeveloperProtectedRoute from "@/components/pages/developer/access/DeveloperProtectedRoute.jsx";
import Category from "@/components/pages/developer/category/Category.jsx";
import Customers from "@/components/pages/developer/customers/Customers";
import DefectiveProduct from "@/components/pages/developer/defective-product/DefectiveProduct";
import Inventory from "@/components/pages/developer/inventory/Inventory.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import ProductPrice from "@/components/pages/developer/product-price/ProductPrice";
import Product from "@/components/pages/developer/product/Product.jsx";
import Purchase from "@/components/pages/developer/purchase/Purchase";
import Receiving from "@/components/pages/developer/receiving/Receiving.jsx";
import ReturnProduct from "@/components/pages/developer/return-product/ReturnProduct";
import Sales from "@/components/pages/developer/sales/Sales";
import Settings from "@/components/pages/developer/settings/Settings";
import Unit from "@/components/pages/developer/settings/unit/Unit";
import Supplier from "@/components/pages/developer/supplier/Supplier.jsx";

export const routesSystem = [
  {
    path: `${devNavUrl}/${urlSystem}/overview`,
    element: (
      <DeveloperProtectedRoute>
        <Overview />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/inventory`,
    element: (
      <DeveloperProtectedRoute>
        <Inventory />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/receiving`,
    element: (
      <DeveloperProtectedRoute>
        <Receiving />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/defective-product`,
    element: (
      <DeveloperProtectedRoute>
        <DefectiveProduct />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/sales`,
    element: (
      <DeveloperProtectedRoute>
        <Sales />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/products`,
    element: (
      <DeveloperProtectedRoute>
        <Product />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/product-price`,
    element: (
      <DeveloperProtectedRoute>
        {" "}
        <ProductPrice />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/suppliers`,
    element: (
      <DeveloperProtectedRoute>
        {" "}
        <Supplier />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/customers`,
    element: (
      <DeveloperProtectedRoute>
        {" "}
        <Customers />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/category`,
    element: (
      <DeveloperProtectedRoute>
        <Category />
      </DeveloperProtectedRoute>
    ),
  },
  {
    path: `${devNavUrl}/${urlSystem}/return-product`,
    element: (
      <DeveloperProtectedRoute>
        {" "}
        <ReturnProduct />
      </DeveloperProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlSystem}/unit`,
    element: (
      <DeveloperProtectedRoute>
        {" "}
        <Unit />
      </DeveloperProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlSystem}/settings`,
    element: (
      <DeveloperProtectedRoute>
        <Settings />
      </DeveloperProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlSystem}/purchase`,
    element: (
      <DeveloperProtectedRoute>
        <Purchase />
      </DeveloperProtectedRoute>
    ),
  },
];
