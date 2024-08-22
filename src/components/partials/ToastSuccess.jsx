import { CircleCheckBig, X } from "lucide-react";
import React from "react";
import { setSuccess } from "../store/StoreAction.jsx";
import { StoreContext } from "../store/StoreContext.jsx";

const ToastSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setSuccess(false));
    }, 5500);
  };

  return (
    <>
      <div
        className={`toast transition-all fixed bottom-20 -right-full z-40 flex item-center animate-slideRight opacity-100 ${
          store.isAnimating ? "" : "open"
        }}`}
      >
        <div className="p-2 px-3 bg-success  center-all rounded-l-md">
          <CircleCheckBig color="#fff" size={22} />
        </div>
        <div className="bg-light p-2 px-4 text-sm ">
          <p className="mb-0 text-base text-success">{store.message}</p>
        </div>
        <button className="p-2 bg-light rounded-r-md">
          <X size={14} onClick={handleClose} />
        </button>
      </div>
    </>
  );
};

export default ToastSuccess;
