import {
  devNavUrl,
  handleEscape,
} from "@/components/helpers/functions-general.jsx";
import { setIsLogout } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { LogOut, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalLogout = ({ msg }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsLogout(false));
  };

  const handleYes = async () => {
    localStorage.removeItem("localhristoken");
    store.credentials.data.role_is_developer === 1
      ? window.location.replace(`${devNavUrl}/developer/login`)
      : window.location.replace(`${devNavUrl}/login`);
  };

  handleEscape(() => handleClose());

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary ">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-alert mb-0">
              <LogOut size={16} />
              Logout
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-3">
            <p className=" mb-2">{msg}</p>
          </div>

          <div className="flex p-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
            <button
              className="btn btn-alert center-all w-full whitespace-nowrap"
              onClick={handleYes}
            >
              Logout
            </button>
            <button
              className="btn btn-discard center-all w-full whitespace-nowrap"
              type="reset"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalLogout;
