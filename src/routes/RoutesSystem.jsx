import { devNavUrl } from "@/components/helpers/functions-general";
import Category from "@/components/pages/developer/category/Category.jsx";
import Customers from "@/components/pages/developer/customers/Customers";
import DefectiveProduct from "@/components/pages/developer/defective-product/DefectiveProduct";
import Inventory from "@/components/pages/developer/inventory/Inventory.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import Product from "@/components/pages/developer/product/Product.jsx";
import Receiving from "@/components/pages/developer/receiving/Receiving.jsx";
import ReturnProduct from "@/components/pages/developer/return-product/ReturnProduct";
import Sales from "@/components/pages/developer/sales/Sales";
import Settings from "@/components/pages/developer/settings/Settings";
import Unit from "@/components/pages/developer/settings/unit/Unit";
import Supplier from "@/components/pages/developer/supplier/Supplier.jsx";

export const routesSystem = [
  {
    path: `${devNavUrl}/system/overview`,
    element: <Overview />,
  },
  {
    path: `${devNavUrl}/system/inventory`,
    element: <Inventory />,
  },
  {
    path: `${devNavUrl}/system/receiving`,
    element: <Receiving />,
  },
  {
    path: `${devNavUrl}/system/defective-product`,
    element: <DefectiveProduct />,
  },
  {
    path: `${devNavUrl}/system/sales`,
    element: <Sales />,
  },
  {
    path: `${devNavUrl}/system/products`,
    element: <Product />,
  },
  {
    path: `${devNavUrl}/system/suppliers`,
    element: <Supplier />,
  },
  {
    path: `${devNavUrl}/system/customers`,
    element: <Customers />,
  },
  {
    path: `${devNavUrl}/system/category`,
    element: <Category />,
  },
  {
    path: `${devNavUrl}/system/return-product`,
    element: <ReturnProduct />,
  },
  // {
  //   path: `${devNavUrl}/system/settings`,
  //   element: <Unit />,
  // },
  {
    path: `${devNavUrl}/system/unit`,
    element: <Unit />,
  },

  {
    path: `${devNavUrl}/system/settings`,
    element: <Settings />,
  },
];
