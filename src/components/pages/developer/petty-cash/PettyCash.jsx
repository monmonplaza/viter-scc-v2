import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ModalPettyCash from "./ModalPettyCash.jsx";
import PettyCashList from "./PettyCashList.jsx";
const PettyCash = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <Navigation menu="petty-cash" />

        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="main-wrapper  bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Petty Cash</h1>
                <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
                  <Plus size={14} className="!stroke-[2px]" /> Add
                </button>
              </div>

              <PettyCashList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </div>
        </main>
      </div>

      {store.isAdd && <ModalPettyCash itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default PettyCash;
