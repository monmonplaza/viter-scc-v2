import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import ModalUnit from "./ModalUnit";
import UnitList from "./UnitList";

const Unit = () => {
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
          <h3 className="mb-0 ">Unit</h3>
          <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
            <Plus size={14} className="!stroke-[2px]" /> Add
          </button>
        </div>
        <UnitList setItemEdit={setItemEdit} />
      </div>
      {store.isAdd && <ModalUnit itemEdit={itemEdit} />}
    </>
  );
};

export default Unit;
