import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
<<<<<<< HEAD
import Navigation from "@/components/partials/Navigation.jsx";
import { Plus } from "lucide-react";
import React from "react";

const Receiving = () => {
=======
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Plus } from "lucide-react";
import React from "react";
import ReceivingList from "./ReceivingList.jsx";
import ModalAddReceiving from "./ModalAddReceiving.jsx";

const Receiving = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

>>>>>>> 1c42977f832b70c6576dde5c72bcf77ef00281b3
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="receiving" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Receiving</h1>
<<<<<<< HEAD

                {/* <button className="btn btn-accent h-[34px] ">
                  <Plus size={20} className="!stroke-[2px]" /> Add
                </button> */}
              </div>
            </div>

=======
                <div>
                  <button
                    className="btn btn-accent h-[34px]"
                    onClick={handleAdd}
                  >
                    <Plus size={14} className="!stroke-[2px]" /> Add
                  </button>
                </div>
              </div>
              <ReceivingList setItemEdit={setItemEdit} />
            </div>
>>>>>>> 1c42977f832b70c6576dde5c72bcf77ef00281b3
            <Footer />
          </div>
        </main>
      </div>
<<<<<<< HEAD
=======

      {store.isAdd && <ModalAddReceiving itemEdit={itemEdit} />}

      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
>>>>>>> 1c42977f832b70c6576dde5c72bcf77ef00281b3
    </>
  );
};

export default Receiving;
