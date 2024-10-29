import {
  devNavUrl,
  hexToRgb,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import PageNotFound from "@/components/partials/PageNotFound.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setCredentials } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import { Navigate } from "react-router-dom";

const OtherProtectedRoute = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const localhristoken = JSON.parse(localStorage.getItem("localhristoken"));
  const [pageStatus, setPageStatus] = React.useState(false);

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(`/${ver}/settings-user/token`, "post", {
        token: localhristoken.token,
      });
      let company_info = false;

      const isUserKeyMatched = login.data.user_key === login.data.user_password;

      if (isUserKeyMatched === false) {
        setLoading(false);
        setIsAuth("456");
        localStorage.removeItem("localhristoken");
        return;
      }

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
      } else {
        company_info =
          login.data.company_info !== null ? login.data.company_info : null;
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
        delete login.data.user_password;
        delete login.data.user_key;
        delete login.data.role_description;
        delete login.data.role_created;
        delete login.data.role_datetime;
        delete login.data.access_created;
        delete login.data.access_datetime;
      }

      if (company_info !== null) {
        document
          .querySelector(":root")
          .style.setProperty(
            "--secondary",
            hexToRgb(company_info[0]?.company_info_color_secondary)
          );
        document
          .querySelector(":root")
          .style.setProperty(
            "--accent",
            hexToRgb(company_info[0]?.company_info_color_accent)
          );
      } else {
        document
          .querySelector(":root")
          .style.setProperty("--accent", hexToRgb("#01596f"));
        document
          .querySelector(":root")
          .style.setProperty("--secondary", hexToRgb("#ffffff"));
      }

      if (
        !login.success ||
        login.data.role.toLowerCase() !== login.data.role_name.toLowerCase()
      ) {
        setPageStatus(true);
      }
    };

    if (localhristoken !== null) {
      fetchLogin();
    } else {
      setLoading(false);
      localStorage.removeItem("localhristoken");
      setIsAuth("456");
    }
  }, [dispatch]);

  if (pageStatus) {
    return <PageNotFound />;
  } else {
    return (
      <>
        {loading ? (
          <SpinnerTable />
        ) : isAuth === "123" ? (
          children
        ) : isAuth === "456" ? (
          <Navigate to={`${devNavUrl}/login`} />
        ) : (
          <p>API end point error / Page not found.</p>
        )}
      </>
    );
  }
};

export default OtherProtectedRoute;
