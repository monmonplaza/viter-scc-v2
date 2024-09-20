import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import ProductCategoryList from "./ProductCategoryList";
import ModalProductCategory from "./ModalProductCategory";

const ProductCategory = () => {
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
          <h3 className="mb-0 ">Category Product</h3>
          <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
            <Plus size={14} className="!stroke-[2px]" /> Add
          </button>
        </div>
        <ProductCategoryList setItemEdit={setItemEdit} />
      </div>
      {store.isAdd && <ModalProductCategory itemEdit={itemEdit} />}
    </>
  );
};

export default ProductCategory;
