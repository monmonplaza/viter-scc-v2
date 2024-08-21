import { Archive, X } from "lucide-react";
import React from "react";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalConfirm = () => {
  return (
    <WrapperModal>
      <div className="modal-center rounded-md">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h3 className="flex items-center gap-2 !font-medium text-warning mb-0">
            <Archive />
            Confirm
          </h3>
          <button type="button">
            <X />
          </button>
        </div>

        <div className="p-2.5">
          <p className="text-sm mb-2">
            You are about to delete “Item Name” record. This action cannot be
            undo.
          </p>
          <p> Are you sure you want to confinue?</p>
        </div>

        <div className="flex p-2.5 gap-2 justify-end w-[70%] ml-auto">
          <button className="btn btn-warning center-all w-full ">
            Confirm
          </button>
          <button className="btn btn-discard center-all w-full">Discard</button>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalConfirm;
