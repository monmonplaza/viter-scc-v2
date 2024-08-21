import { devNavUrl } from "@/components/helpers/functions-general";
import Product from "@/components/pages/developer/products/Product.jsx";

export const routesSystem = [
  {
    path: `${devNavUrl}/system/products`,
    element: <Product />,
  },
];
