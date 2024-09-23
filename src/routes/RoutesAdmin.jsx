import { devNavUrl, urlAdmin } from "@/components/helpers/functions-general";
import OtherProtectedRoute from "@/components/pages/developer/access/OtherProtectedRoute.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import Settings from "@/components/pages/developer/settings/Settings.jsx";

export const routesAdmin = [
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
];
