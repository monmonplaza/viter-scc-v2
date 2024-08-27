import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import UnitList from "./unit/UnitList";

const Settings = () => {
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="settings" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Settings</h1>
              </div>
              <UnitList />
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
