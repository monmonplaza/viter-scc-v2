import { setValidate } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { TriangleAlert, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalValidate = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setValidate(false));
  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-secondary">
        <div className="p-5 pb-0">
          <TriangleAlert
            size={70}
            className="mx-auto mb-2 text-info !stroke-[4px]	"
          />
          <p className="text-base text-center text-balance ">{store.message}</p>
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
    </WrapperModal>
  );
};

export default ModalValidate;
