import { TriangleAlert, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalError = () => {
  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-light">
        <div className="p-5 pb-0">
          <TriangleAlert
            size={70}
            className="mx-auto mb-2 text-alert !stroke-[4px]	"
          />
          <p className="text-base text-center text-balance ">
            Something went wrong. Please try again later.
          </p>
        </div>

        <div className="flex p-3 pb-5 gap-2 justify-end w-full ml-auto">
          <button className="btn btn-alert center-all w-full">Okay</button>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalError;
