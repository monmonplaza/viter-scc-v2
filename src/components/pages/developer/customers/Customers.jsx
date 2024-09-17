import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import { Plus } from "lucide-react";
import CustomersList from "./CustomersList";
import React from "react";
import { StoreContext } from "@/components/store/StoreContext";
import ToastSuccess from "@/components/partials/ToastSuccess";
import ModalValidate from "@/components/partials/modal/ModalValidate";
import ModalCustomers from "./ModalCustomers";
import { setIsAdd } from "@/components/store/StoreAction";

const Customers = () => {
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
          <Navigation menu="customers" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Customers</h1>

                <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
                  <Plus size={14} className="!stroke-[2px]" /> Add
                </button>
              </div>
              <CustomersList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </div>
        </main>
      </div>
      {store.isAdd && <ModalCustomers itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default Customers;
