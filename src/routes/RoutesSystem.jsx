import { devNavUrl } from "@/components/helpers/functions-general";
import Category from "@/components/pages/developer/category/Category.jsx";
import Inventory from "@/components/pages/developer/inventory/Inventory.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import Product from "@/components/pages/developer/product/Product.jsx";
import Supplier from "@/components/pages/developer/supplier/Supplier.jsx";

export const routesSystem = [
  {
    path: `${devNavUrl}/system/overview`,
    element: <Overview />,
  },

  {
    path: `${devNavUrl}/system/suppliers`,
    element: <Supplier />,
  },
  {
    path: `${devNavUrl}/system/products`,
    element: <Product />,
  },

  {
    path: `${devNavUrl}/system/category`,
    element: <Category />,
  },
];
