import { setError } from "@/components/store/StoreAction.jsx";
import { TriangleAlert } from "lucide-react";
import React from "react";

const ModalError = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isAnimate, setAnimate] = React.useState(true);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      dispatch(setError(false));
    }, 500);
  };
  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-screen z-[9999999999] ${
        isAnimate ? "open" : ""
      }`}
    >
      <div
        onClick={handleClose}
        className="backdrop w-full h-full bg-black  animate-fadeIn bg-opacity-0 transition-all"
      ></div>
      <div className="modal-center rounded-md !bg-light">
        <div className="p-5 pb-0">
          <TriangleAlert
            size={70}
            className="mx-auto mb-2 text-alert !stroke-[4px]	"
          />
          <p className="text-base text-center text-balance ">
            Something went wrong. Please try again later.
          </p>
          <p>{store.message}</p>
        </div>

        <div className="flex p-3 pb-5 gap-2 justify-end w-full ml-auto">
          <button
            className="btn btn-alert center-all w-full"
            onClick={handleClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
