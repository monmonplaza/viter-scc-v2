import React from "react";
import { checkLocalStorage } from "../helpers/CheckLocalStorage";
import { ver } from "../helpers/functions-general.jsx";
import { checkRoleToRedirect } from "../helpers/login-functions";
import { queryData } from "../helpers/queryData";
import { setIsLogin } from "../store/StoreAction.jsx";
import { StoreContext } from "../store/StoreContext.jsx";

const useOtherIsLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await queryData(`/${ver}/settings-user/token`, "post", {
        token: checkLocalStorage().token,
      });

      if (typeof login === "undefined" || !login.success) {
        localStorage.removeItem("localhristoken");
        setLoading(false);
      } else {
        setLoading(false);
        // console.log("useOtherIsLogin", login.data);
        checkRoleToRedirect(navigate, login.data);
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);

  return { loginLoading };
};

export default useOtherIsLogin;
