import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import { Plus } from "lucide-react";
import ModalProduct from "./ModalProduct.jsx";
import ProductList from "./ProductList.jsx";

const Product = () => {
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside className="min-w-[250px] border-r border-line min-h-[100dvh] sticky top-0 bg-light">
          <Navigation />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Suppliers</h1>
                <div>
                  <button className="btn btn-accent h-[34px] ">
                    <Plus size={20} strokeWidth={1.2} /> Add
                  </button>
                </div>
              </div>

              <ProductList />
            </div>

            <Footer />
          </div>
        </main>
      </div>
      {/* <ModalProduct /> */}
      <ModalConfirm />
    </>
  );
};

export default Product;
