import { devNavUrl, urlSystem } from "@/components/helpers/functions-general";
import Category from "@/components/pages/developer/category/Category.jsx";
import Customers from "@/components/pages/developer/customers/Customers";
import DefectiveProduct from "@/components/pages/developer/defective-product/DefectiveProduct";
import Inventory from "@/components/pages/developer/inventory/Inventory.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import ProductPrice from "@/components/pages/developer/product-price/ProductPrice";
import Product from "@/components/pages/developer/product/Product.jsx";
import Receiving from "@/components/pages/developer/receiving/Receiving.jsx";
import ReturnProduct from "@/components/pages/developer/return-product/ReturnProduct";
import Sales from "@/components/pages/developer/sales/Sales";
import Settings from "@/components/pages/developer/settings/Settings";
import Unit from "@/components/pages/developer/settings/unit/Unit";
import Supplier from "@/components/pages/developer/supplier/Supplier.jsx";

export const routesSystem = [
  {
    path: `${devNavUrl}/${urlSystem}/overview`,
    element: <Overview />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/inventory`,
    element: <Inventory />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/receiving`,
    element: <Receiving />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/defective-product`,
    element: <DefectiveProduct />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/sales`,
    element: <Sales />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/products`,
    element: <Product />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/product-price`,
    element: <ProductPrice />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/suppliers`,
    element: <Supplier />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/customers`,
    element: <Customers />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/category`,
    element: <Category />,
  },
  {
    path: `${devNavUrl}/${urlSystem}/return-product`,
    element: <ReturnProduct />,
  },
  // {
  //   path: `${devNavUrl}/${urlSystem}/settings`,
  //   element: <Unit />,
  // },
  {
    path: `${devNavUrl}/${urlSystem}/unit`,
    element: <Unit />,
  },

  {
    path: `${devNavUrl}/${urlSystem}/settings`,
    element: <Settings />,
  },
];
