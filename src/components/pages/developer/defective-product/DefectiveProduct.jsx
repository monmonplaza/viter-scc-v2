import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";

const DefectiveProduct = () => {
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="defective-product" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">DefectiveProduct</h1>

                {/* <button className="btn btn-accent h-[34px] ">
                  <Plus size={20} className="!stroke-[2px]" /> Add
                </button> */}
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default DefectiveProduct;
