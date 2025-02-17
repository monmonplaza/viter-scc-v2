import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import {
  Building2,
  Ruler,
  Settings2,
  Shapes,
  SquareUserRound,
  UserRoundCog,
  UserRoundPen,
} from "lucide-react";
import React from "react";
import Developer from "./developer/Developer.jsx";
import ProductCategory from "./product-category/ProductCategory.jsx";
import Roles from "./roles/Roles.jsx";
import Unit from "./unit/Unit.jsx";
import User from "./user/User.jsx";
import CompanyInfo from "./company-info/CompanyInfo.jsx";

const Settings = () => {
  const { store } = React.useContext(StoreContext);
  const [tabindex, setTabindex] = React.useState(0);
  const [showSettings, setShowSettings] = React.useState(false);
  let settingPages = [];
  let settingsLink = [];

  if (store.credentials?.data.role === "Developer") {
    settingPages = [
      <Unit />,
      <Roles />,
      <User />,
      <Developer />,
      <ProductCategory />,
      <CompanyInfo />,
    ];

    settingsLink = [
      { label: "Unit", icon: <Ruler size={14} /> },
      { label: "Roles", icon: <UserRoundCog size={14} /> },
      { label: "Users", icon: <UserRoundPen size={14} /> },
      { label: "Developer", icon: <SquareUserRound size={14} /> },
      { label: "Category", icon: <Shapes size={14} /> },
      { label: "Company info", icon: <Building2 size={14} /> },
    ];
  } else {
    settingPages = [<Unit />, <User />, <ProductCategory />, <CompanyInfo />];
    settingsLink = [
      { label: "Unit", icon: <Ruler size={14} /> },
      { label: "Users", icon: <UserRoundPen size={14} /> },
      { label: "Category", icon: <Shapes size={14} /> },
      { label: "Company info", icon: <Building2 size={14} /> },
    ];
  }

  const handleChangeSettingMenu = (index) => {
    setTabindex(index);
    setShowSettings(false);
  };

  const handleShowSettings = () => setShowSettings(!showSettings);
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <Navigation menu="settings" />
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="bg-secondary">
              <div className="grid md:grid-cols-[250px_1fr] gap-5">
                <div className="setting-nav bg-subnav md:min-h-[calc(100vh-100px)] border-r border-line  px-4 relative ">
                  <div className="flex justify-between items-center">
                    <h2 className="my-3 md:my-7 ">Settings</h2>
                    <button className="md:hidden" onClick={handleShowSettings}>
                      <Settings2 />
                    </button>
                  </div>
                  <ul
                    className={`${
                      showSettings ? "max-h-[500px]" : "max-h-0"
                    } space-y-2 h-auto md:h-unset overflow-hidden transition-all absolute md:static bg-subnav z-30 w-full left-0 md:overflow-visible px-3 md:px-0`}
                  >
                    {settingsLink.map((link, key) => {
                      return (
                        <li
                          key={key}
                          className={`p-2 hover:opacity-100 ${
                            key === tabindex
                              ? "bg-accent bg-opacity-75 rounded-md text-white opacity-100"
                              : "opacity-80"
                          }`}
                        >
                          <button
                            className="text-xs flex items-center w-full text-left gap-4"
                            onClick={() => handleChangeSettingMenu(key)}
                          >
                            {link.icon}
                            {link.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="setting-main  w-full pr-3 ">
                  {settingPages[tabindex]}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
