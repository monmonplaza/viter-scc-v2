import { devNavUrl } from "@/components/helpers/functions-general.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import React from "react";
import { Link } from "react-router-dom";

const DeveloperLogin = () => {
  return (
    <div className="h-screen w-full center-all bg-primary">
      <div className="max-w-[340px] w-full bg-secondary p-4">
        <div className="login-header">
          <div className=" flex gap-2 items-center justify-center my-2">
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

          <h5 className="text-center my-3 text-base">Developer</h5>
        </div>
        <div className="login-body">
          <form action="">
            <div className="input-wrap">
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>
            <div className="input-wrap">
              <label htmlFor="">Password</label>
              <input type="text" />
            </div>

            <button className="btn btn-accent w-full justify-center mt-5">
              Login
            </button>

            <Link
              to={`${devNavUrl}/system/forgot-password`}
              className="text-xs block text-center mt-5"
            >
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;
