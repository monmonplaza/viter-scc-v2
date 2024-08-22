import React from "react";

const Header = () => {
  return (
    <header className="p-4 flex justify-end bg-primary border-b border-line">
      <div className="profile flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="mb-0 leading-none font-medium">Hi Ramon,</h4>
            <small className="leading-none text-xs  block">Admin</small>
          </div>
          <div className="size-8 bg-accent text-white center-all rounded-full cursor-pointer">
            RP
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
