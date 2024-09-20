import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess";
import ModalValidate from "@/components/partials/modal/ModalValidate";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import ModalProductPrice from "./ModalProductPrice";
import ProductPriceList from "./ProductPriceList";

const ProductPrice = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="product-price" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Product Price</h1>

                <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
                  <Plus size={14} className="!stroke-[2px]" /> Add
                </button>
              </div>
              <ProductPriceList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </div>
        </main>
      </div>
      {store.isAdd && <ModalProductPrice itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default ProductPrice;
