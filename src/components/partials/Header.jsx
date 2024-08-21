import React from "react";

const Header = () => {
  return (
    <header className="py-2 px-4 flex justify-end bg-light border-b border-line">
      <div className="profile flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="mb-0 leading-none">Hi Ramon,</h4>
            <small className="leading-none text-xs  block">Admin</small>
          </div>
          <div className="size-8 bg-accent text-light center-all rounded-full cursor-pointer">
            RP
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
