import { devNavUrl, urlCashier } from "@/components/helpers/functions-general";
import OtherProtectedRoute from "@/components/pages/access/OtherProtectedRoute.jsx";
import Account from "@/components/pages/admin/account/Account.jsx";
import Sales from "@/components/pages/cashier/Sales.jsx";
import Customers from "@/components/pages/developer/customers/Customers";

export const RoutesCashier = [
  {
    path: `${devNavUrl}/${urlCashier}/account`,
    element: (
      <OtherProtectedRoute>
        <Account />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlCashier}/sales`,
    element: (
      <OtherProtectedRoute>
        <Sales />
      </OtherProtectedRoute>
    ),
  },
];
