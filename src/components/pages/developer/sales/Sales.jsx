import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ModalAddSales from "./ModalAddSales.jsx";
import ModalViewSales from "./ModalViewSales.jsx";
import SalesList from "./SalesList.jsx";

const Sales = () => {
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
        <aside>
          <Navigation menu="sales" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              {/* <Breadcrumbs /> */}

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Sales</h1>
                <div>
                  <button
                    className="btn btn-accent h-[34px]"
                    onClick={handleAdd}
                  >
                    <Plus size={14} className="!stroke-[2px]" /> Add
                  </button>
                </div>
              </div>
              <SalesList setItemEdit={setItemEdit} setIsView={setIsView} />
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {store.isAdd && <ModalAddSales itemEdit={itemEdit} />}
      {isView && <ModalViewSales itemEdit={itemEdit} setIsView={setIsView} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default Sales;
