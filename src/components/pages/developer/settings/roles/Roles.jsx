import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ModalRoles from "./ModalRoles.jsx";
import RolesList from "./RolesList.jsx";

const Roles = () => {
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
          <h3 className="mb-0">Roles</h3>
          <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
            <Plus size={14} className="!stroke-[2px]" /> Add
          </button>
        </div>
        <RolesList setItemEdit={setItemEdit} />
      </div>
      {store.isAdd && <ModalRoles itemEdit={itemEdit} />}
    </>
  );
};

export default Roles;
