import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ModalProduct from "./ModalProduct.jsx";
import ProductList from "./ProductList.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
const Product = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside className="min-w-[250px] border-r border-line min-h-[100dvh] sticky top-0 bg-primary">
          <Navigation menu="products" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Product</h1>
                <div>
                  <button
                    className="btn btn-accent h-[34px]"
                    onClick={handleAdd}
                  >
                    <Plus size={14} className="!stroke-[2px]" /> Add
                  </button>
                </div>
              </div>

              <ProductList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </div>
        </main>
      </div>

      {store.isAdd && <ModalProduct itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default Product;
