import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  devBaseUrl,
  devNavUrl,
} from "./components/helpers/functions-general.jsx";
import DeveloperCreatePassword from "./components/pages/developer/access/DeveloperCreatePassword.jsx";
import DeveloperForgotPassword from "./components/pages/developer/access/DeveloperForgotPassword.jsx";
import DeveloperLogin from "./components/pages/developer/access/DeveloperLogin.jsx";
import { StoreProvider } from "./components/store/StoreContext";
import { routesSystem } from "./routes/RoutesSystem";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route
                path={`${devNavUrl}/system/login`}
                element={<DeveloperLogin />}
              />

              <Route
                path={`${devNavUrl}/system/forgot-password`}
                element={<DeveloperForgotPassword />}
              />

              <Route
                path={`${devNavUrl}/system/create-password`}
                element={<DeveloperCreatePassword />}
              />
              {/* <Route path={`*`} element={<PageNotFound />} /> */}

              {routesSystem.map(({ ...routeProps }, key) => {
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
