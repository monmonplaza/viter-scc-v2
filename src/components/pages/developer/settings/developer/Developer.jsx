import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import DeveloperList from "./DeveloperList.jsx";
import ModalDeveloper from "./ModalDeveloper.jsx";

const Developer = () => {
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
          <h3 className="mb-0 ">Developer</h3>
          <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
            <Plus size={14} className="!stroke-[2px]" /> Add
          </button>
        </div>
        <DeveloperList setItemEdit={setItemEdit} />
      </div>
      {store.isAdd && <ModalDeveloper itemEdit={itemEdit} />}
    </>
  );
};

export default Developer;
