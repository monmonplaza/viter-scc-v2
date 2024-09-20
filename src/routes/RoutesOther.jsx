import { devNavUrl, urlOther } from "@/components/helpers/functions-general";
import OtherProtectedRoute from "@/components/pages/developer/access/OtherProtectedRoute.jsx";
import Overview from "@/components/pages/developer/overview/Overview.jsx";
import Settings from "@/components/pages/developer/settings/Settings.jsx";

export const RoutesOther = [
  {
    path: `${devNavUrl}/${urlOther}/overview`,
    element: (
      <OtherProtectedRoute>
        <Overview />
      </OtherProtectedRoute>
    ),
  },

  {
    path: `${devNavUrl}/${urlOther}/settings`,
    element: (
      <OtherProtectedRoute>
        <Settings />
      </OtherProtectedRoute>
    ),
  },
];
