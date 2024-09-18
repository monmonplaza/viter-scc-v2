import { devNavUrl, ver } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import PageNotFound from "@/components/partials/PageNotFound.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setCredentials } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import { Navigate } from "react-router-dom";

const DeveloperProtectedRoute = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const localhristoken = JSON.parse(localStorage.getItem("localhristoken"));
  const [pageStatus, setPageStatus] = React.useState(false);

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(
        `/${ver}/settings-developer/token`,
        "post",
        {
          token: localhristoken.token,
        }
      );

      const isUserKeyMatched =
        login.data.user_key === login.data.developer_password;

      // check if the password from database is matched
      // to the password used to login
      // if not, logout the user

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
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
        delete login.data.developer_password;
        delete login.data.user_key;
        delete login.data.role_description;
        delete login.data.role_created;
        delete login.data.role_datetime;
        delete login.data.access_created;
        delete login.data.access_datetime;
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
          <Navigate to={`${devNavUrl}/system/login`} />
        ) : (
          <p>API end point error / Page not found.</p>
        )}
      </>
    );
  }
};

export default DeveloperProtectedRoute;
