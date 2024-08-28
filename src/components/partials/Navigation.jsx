import {
  ArrowRightLeft,
  Barcode,
  ClipboardList,
  Group,
  LayoutDashboard,
  List,
  PillBottle,
  Settings,
  TicketX,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { devNavUrl } from "../helpers/functions-general.jsx";
import Logo from "./icons/Logo.jsx";
import { StoreContext } from "../store/StoreContext.jsx";
import { setIsSearch } from "../store/StoreAction.jsx";

const Navigation = ({ menu, submenu }) => {
  const { dispatch } = React.useContext(StoreContext);
  const links = [
    {
      icon: <LayoutDashboard size={18} />,
      text: "Overview",
      slug: "overview",
    },
    {
      icon: <ClipboardList size={18} />,
      text: "Inventory",
      slug: "inventory",
    },

    {
      icon: <ArrowRightLeft size={18} />,
      text: "Receiving",
      slug: "receiving",
    },

    {
      icon: <TicketX size={18} />,
      text: "Defective Product",
      slug: "defective-product",
    },
    {
      icon: <Barcode size={18} />,
      text: "Products",
      slug: "products",
    },
    {
      icon: <PillBottle size={18} />,
      text: "Suppliers",
      slug: "suppliers",
    },
    {
      icon: <Users size={18} />,
      text: "Customers",
      slug: "customers",
    },
    {
      icon: <Group size={18} />,
      text: "Category",
      slug: "category",
    },
    {
      icon: <Settings size={18} />,
      text: "Settings",
      slug: "settings",
    },
  ];

  const subLinks = [
    {
      icon: <List size={18} />,
      text: "Unit",
      slug: "unit",
    },
  ];

  const handleResetSearch = () => dispatch(setIsSearch(false));

  return (
    <nav className="py-2 px-4">
      <div className=" flex gap-2 items-center mt-2">
        <div className="p-1 py-2 bg-accent rounded-xl inline-block">
          <Logo />
        </div>
        <div className="translate-y-1">
          <h4 className="leading-none uppercase text-[19px] font-medium">
            Sambahayan
          </h4>
          <span className="text-[11px] leading-none -translate-y-2 block font-regular">
            Consumer Cooperative
          </span>
        </div>
      </div>

      <div className="mt-10">
        {links.map((link, key) => {
          return (
            <ul key={key}>
              <li className="nav-link mb-2 opacity-60 hover:opacity-100">
                <Link
                  onClick={handleResetSearch}
                  to={`${devNavUrl}/system/${link.slug}`}
                  className={`flex gap-4 text-sm items-center leading-none p-3 font-medium hover:bg-secondary text-dark rounded-md transition-all ${
                    link.slug !== "settings"
                      ? menu === link.slug
                        ? "active"
                        : ""
                      : menu === "settings" && "bg-secondary text-dark"
                  }`}
                >
                  {link.icon} {link.text}
                </Link>
              </li>

              {/* {link.slug === "settings" &&
                subLinks.map((link, key) => {
                  return (
                    <li
                      className="nav-link mb-2 opacity-60 hover:opacity-100 ml-5"
                      key={key}
                    >
                      <Link
                        onClick={handleResetSearch}
                        to={`${devNavUrl}/system/${link.slug}`}
                        className={`flex gap-4 text-sm items-center leading-none p-3 font-medium hover:bg-secondary text-dark rounded-md transition-all ${
                          submenu === link.slug ? "active" : ""
                        }`}
                      >
                        {link.icon} {link.text}
                      </Link>
                    </li>
                  );
                })} */}
            </ul>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
