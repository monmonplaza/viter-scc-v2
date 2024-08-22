import { CircleCheckBig, X } from "lucide-react";
import React from "react";
import { setIsAnimating, setSuccess } from "../store/StoreAction.jsx";
import { StoreContext } from "../store/StoreContext.jsx";

const ToastSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setSuccess(false));
    }, 2000);
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);

  return (
    <>
      <div
        className={`toast transition-all fixed bottom-20 z-40 flex item-center -right-full animate-slideRight ${
          store.isAnimating ? "open" : ""
        }`}
      >
        <div className="p-2 px-3 bg-success  center-all rounded-l-md">
          <CircleCheckBig color="#fff" size={22} />
        </div>
        <div className="bg-light p-2 px-4 text-sm ">
          <p className="mb-0 text-base text-dark">{store.message}</p>
        </div>
        <button className="p-2 bg-light rounded-r-md">
          <X size={14} onClick={handleClose} />
        </button>
      </div>
    </>
  );
};

export default ToastSuccess;
