import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import UnitList from "./UnitList";
import { Plus } from "lucide-react";
import React from "react";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import ModalUnit from "./ModalUnit";

const Unit = () => {
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
          <Navigation menu="settings" submenu="unit" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Unit</h1>
                <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
                  <Plus size={14} className="!stroke-[2px]" /> Add
                </button>
              </div>
              <UnitList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </div>
        </main>
      </div>
      {store.isAdd && <ModalUnit itemEdit={itemEdit} />}
    </>
  );
};

export default Unit;
