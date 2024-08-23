import { setValidate } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Files } from "lucide-react";
import React from "react";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalValidate = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isAnimate, setAnimate] = React.useState(true);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      dispatch(setValidate(false));
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
      <div className="modal-center rounded-md !bg-secondary border border-line">
        <div className="p-5 pb-0">
          <Files size={70} className="mx-auto mb-2 text-info !stroke-[4px]" />
          <p className="text-base text-center text-balance py-5">
            {store.message}
          </p>
        </div>

        <div className="flex p-3 pb-5 gap-2 justify-end w-full ml-auto">
          <button
            className="btn btn-info center-all w-full"
            onClick={handleClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalValidate;
