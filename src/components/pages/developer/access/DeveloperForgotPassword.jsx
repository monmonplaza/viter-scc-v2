import { devNavUrl } from "@/components/helpers/functions-general.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import { CheckCircle, CheckCircle2, MailCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const DeveloperForgotPassword = () => {
  return (
    <div className="h-screen w-full center-all bg-primary">
      <div className="max-w-[340px] w-full bg-secondary p-4 rounded-md">
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

          <h5 className="text-center my-3 text-base">
            Developer - Forgot Password
          </h5>
        </div>
        <div className="login-body">
          <p>
            Enter your registered email to receive instruction on how to reset
            your password
          </p>
          <form action="">
            <div className="input-wrap">
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>

            <button className="btn btn-accent w-full justify-center mt-5">
              Reset Password
            </button>
          </form>
        </div>

        <div className="login-message center-all flex-col text-center py-5">
          <MailCheck size={60} stroke={"#00ff00"} className="mb-3" />
          <p className="text-balance">
            We have successfully send the instruction to your email.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperForgotPassword;
