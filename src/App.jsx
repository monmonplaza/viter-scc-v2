import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  devNavUrl,
  urlAdmin,
  urlSystem,
} from "./components/helpers/functions-general.jsx";
import DeveloperCreatePassword from "./components/pages/developer/access/DeveloperCreatePassword.jsx";
import DeveloperForgotPassword from "./components/pages/developer/access/DeveloperForgotPassword.jsx";
import DeveloperLogin from "./components/pages/developer/access/DeveloperLogin.jsx";
import DeveloperVerifyEmail from "./components/pages/developer/access/DeveloperVerifyEmail.jsx";
import OtherCreatePassword from "./components/pages/developer/access/OtherCreatePassword.jsx";
import OtherForgotPassword from "./components/pages/developer/access/OtherForgotPassword.jsx";
import OtherLogin from "./components/pages/developer/access/OtherLogin.jsx";
import OtherVerifyEmail from "./components/pages/developer/access/OtherVerifyEmail.jsx";
import PageNotFound from "./components/partials/PageNotFound.jsx";
import { StoreProvider } from "./components/store/StoreContext";
import { RoutesAdmin } from "./routes/RoutesAdmin.jsx";
import { routesSystem } from "./routes/RoutesSystem";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={`*`} element={<PageNotFound />} />
              <Route
                path={`${devNavUrl}/${urlSystem}/login`}
                element={<DeveloperLogin />}
              />

              <Route
                path={`${devNavUrl}/${urlSystem}/forgot-password`}
                element={<DeveloperForgotPassword />}
              />

              <Route
                path={`${devNavUrl}/${urlSystem}/create-password`}
                element={<DeveloperCreatePassword />}
              />

              <Route
                path={`${devNavUrl}/${urlSystem}/verify-email`}
                element={<DeveloperVerifyEmail />}
              />

              <Route path={`${devNavUrl}/login`} element={<OtherLogin />} />

              <Route
                path={`${devNavUrl}/forgot-password`}
                element={<OtherForgotPassword />}
              />

              <Route
                path={`${devNavUrl}/create-password`}
                element={<OtherCreatePassword />}
              />

              <Route
                path={`${devNavUrl}/verify-email`}
                element={<OtherVerifyEmail />}
              />

              {routesSystem.map(({ ...routeProps }, key) => {
                return <Route key={key} {...routeProps} />;
              })}
              {RoutesAdmin.map(({ ...routeProps }, key) => {
                return <Route key={key} {...routeProps} />;
              })}
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
