import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess";
import ModalValidate from "@/components/partials/modal/ModalValidate";
import { StoreContext } from "@/components/store/StoreContext";
import React from "react";
import DefectiveProductList from "./DefectiveProductList";

const DefectiveProduct = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <Navigation menu="defective-product" />

        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="main-wrapper  bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Defective Product</h1>
              </div>
              <DefectiveProductList />
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {store.success && <ToastSuccess />}
      {store.validate && <ModalValidate />}
    </>
  );
};

export default DefectiveProduct;
