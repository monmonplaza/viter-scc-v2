import { Archive, X } from "lucide-react";
import React from "react";
import WrapperModal from "../wrapper/WrapperModal.jsx";
import SpinnerButton from "../spinners/SpinnerButton.jsx";

const ModalDelete = () => {
  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-light">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h4 className="flex items-center gap-2 !font-medium text-alert mb-0">
            <Archive />
            Confirm
          </h4>
          <button type="button">
            <X />
          </button>
        </div>

        <div className="p-3">
          <p className="text-sm mb-2">
            You are about to delete{" "}
            <span className="font-medium">“Item Name”</span> record.
          </p>
          <p>Are you sure you want to confinue?</p>
        </div>

        <div className="flex p-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
          <button className="btn btn-alert center-all w-full">
            <SpinnerButton /> Delete
          </button>
          <button className="btn btn-discard center-all w-full">Discard</button>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalDelete;
