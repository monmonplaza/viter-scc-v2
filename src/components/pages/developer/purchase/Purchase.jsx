import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ModalAddPurchasePrice from "./ModalAddPurchasePrice.jsx";
import ModalPurchasePrint from "./ModalPurchasePrint.jsx";
import ModalViewPurchase from "./ModalViewPurchase.jsx";
import PurchaseList from "./PurchaseList.jsx";

const Purchase = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isView, setIsView] = React.useState(false);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <Navigation menu="purchase" />

        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper bg-secondary">
              {/* <Breadcrumbs /> */}

              <div className="flex justify-between items-center my-5 px-2 md:px-0">
                <h1 className="mb-0">Purchase Order</h1>
                <div>
                  <button
                    className="btn btn-accent h-[34px]"
                    onClick={handleAdd}
                  >
                    <Plus size={14} className="!stroke-[2px]" /> Add
                  </button>
                </div>
              </div>
              <PurchaseList setItemEdit={setItemEdit} setIsView={setIsView} />
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {store.isAdd && <ModalAddPurchasePrice itemEdit={itemEdit} />}
      {isView && (
        <ModalViewPurchase itemEdit={itemEdit} setIsView={setIsView} />
      )}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default Purchase;
