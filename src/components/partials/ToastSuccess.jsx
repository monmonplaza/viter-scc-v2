import { CircleCheckBig, X } from "lucide-react";
import React from "react";
import { devNavUrl } from "../helpers/functions-general.jsx";
import {
  setIsAccountUpdated,
  setIsAnimating,
  setSuccess,
} from "../store/StoreAction.jsx";
import { StoreContext } from "../store/StoreContext.jsx";

const ToastSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setSuccess(false));
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleClose();
      if (store.isAccountUpdated) {
        localStorage.removeItem("localhristoken");
        store.credentials.data.role_is_developer === 1
          ? window.location.replace(`${devNavUrl}/developer/login`)
          : window.location.replace(`${devNavUrl}/login`);
        dispatch(setIsAccountUpdated(false));
        return;
      }
    }, 4000);
  }, []);

  return (
    <>
      <div
        className={`toast transition-all fixed bottom-20 z-40 flex item-center -right-full  ${
          store.success ? "open" : ""
        }`}
      >
        <div className="p-2 px-3 bg-success  center-all rounded-l-md">
          <CircleCheckBig color="#fff" size={22} />
        </div>
        <div className="bg-light p-2 px-4 text-sm ">
          <p className="mb-0  text-dark">{store.message}</p>
        </div>
        <button className="p-2 bg-light rounded-r-md">
          <X size={14} onClick={handleClose} />
        </button>
      </div>
    </>
  );
};

export default ToastSuccess;
