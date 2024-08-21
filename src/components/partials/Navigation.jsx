import { ArrowRightLeft, ClipboardList, LayoutDashboard } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./icons/Logo.jsx";

const Navigation = () => {
  return (
    <nav className="py-2 px-4">
      <div className=" flex gap-2 items-center">
        <div className="p-2 py-3 bg-accent rounded-2xl inline-block">
          <Logo />
        </div>
        <div>
          <h4 className="leading-none uppercase text-[19px] font-medium">
            Sambahayan
          </h4>
          <span className="text-[11px] leading-none -translate-y-0.5 block font-regular">
            Consumer Cooperative
          </span>
        </div>
      </div>

      <ul className="mt-10">
        <li className="mb-2 opacity-80 hover:opacity-100">
          <Link
            to="#"
            className="flex gap-4 text-sm  items-center leading-none p-3 font-medium hover:bg-secondary text-dark rounded-md transition-all"
          >
            <LayoutDashboard size={16} /> Overview
          </Link>
        </li>

        <li className="mb-2 opacity-80 hover:opacity-100">
          <Link
            to="#"
            className="flex gap-4 text-sm  items-center leading-none p-3 font-medium hover:bg-secondary text-dark rounded-md transition-all "
          >
            <ClipboardList size={16} /> Inventory
          </Link>
        </li>

        <li className="mb-2 opacity-80 hover:opacity-100">
          <Link
            to="#"
            className="flex gap-4 text-sm  items-center leading-none p-3 font-medium hover:bg-secondary text-dark rounded-md transition-all "
          >
            <ArrowRightLeft size={16} /> Receiving
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
