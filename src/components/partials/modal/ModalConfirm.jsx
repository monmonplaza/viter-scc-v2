import { Archive, X } from "lucide-react";
import React from "react";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalConfirm = () => {
  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-light ">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h4 className="flex items-center gap-2 !font-medium text-warning mb-0">
            <Archive />
            Confirm
          </h4>
          <button type="button">
            <X />
          </button>
        </div>

        <div className="p-3">
          <p className="text-sm mb-2">
            You are about to archive{" "}
            <span className="font-medium">“Item Name”</span>. Are you sure
            youxxxx want to continue?
          </p>
        </div>

        <div className="flex p-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
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
