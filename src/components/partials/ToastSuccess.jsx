import { CircleCheckBig, X } from "lucide-react";
import React from "react";

const ToastSuccess = () => {
  return (
    <>
      <div className="fixed bottom-20 right-10 z-40 flex item-center">
        <div className="p-2 px-3 bg-success  center-all rounded-l-md">
          <CircleCheckBig color="#fff" size={22} />
        </div>
        <div className="bg-light p-2 px-4 text-sm ">
          <p className="mb-0 text-base text-success">
            Record Successfully Updated
          </p>
        </div>
        <button className="p-2 bg-light rounded-r-md">
          <X size={14} />
        </button>
      </div>
    </>
  );
};

export default ToastSuccess;
