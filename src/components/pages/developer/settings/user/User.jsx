import ModalError from "@/components/partials/modal/ModalError.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import ModalUser from "./ModalUser.jsx";
import UserList from "./UserList.jsx";

const User = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <div className="main-wrapper px-2 bg-secondary">
        <div className="flex justify-between items-center mb-5">
          <h3 className="mb-0 ">Users</h3>
          <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
            <Plus size={14} className="!stroke-[2px]" /> Add
          </button>
        </div>
        <UserList setItemEdit={setItemEdit} />
      </div>
      {store.isAdd && <ModalUser itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default User;
