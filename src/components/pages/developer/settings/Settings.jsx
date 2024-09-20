import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import Pill from "@/components/partials/Pill";
import {
  Archive,
  ArchiveRestore,
  Plus,
  Ruler,
  SquarePen,
  SquareUserRound,
  Trash,
  UserRoundCog,
  UserRoundPen,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Developer from "./developer/Developer.jsx";
import Roles from "./roles/Roles.jsx";
import Unit from "./unit/Unit.jsx";
import User from "./user/User.jsx";

const Settings = () => {
  const [tabindex, setTabindex] = React.useState(0);
  const links = [
    { label: "Unit", icon: <Ruler size={14} /> },
    { label: "Roles", icon: <UserRoundCog size={14} /> },
    { label: "Users", icon: <UserRoundPen size={14} /> },
    { label: "Developer", icon: <SquareUserRound size={14} /> },
  ];

  const settingPages = [<Unit />, <Roles />, <User />, <Developer />];

  const handleChangeSettingMenu = (index) => {
    setTabindex(index);
  };
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="settings" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="bg-secondary">
              <div className="grid grid-cols-[250px_1fr] gap-5">
                <div className="setting-nav bg-subnav min-h-[calc(100vh-90px)] border-r border-line  px-4 ">
                  <h2 className="my-7">Settings</h2>
                  <ul className="space-y-2">
                    {links.map((link, key) => {
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

                <div className="setting-main  max-w-[700px] w-full ">
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
