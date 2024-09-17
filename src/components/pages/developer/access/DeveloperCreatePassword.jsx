import { devNavUrl } from "@/components/helpers/functions-general.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import { Check, CircleCheckBig, MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperCreatePassword = () => {
  const [Password, setPassword] = React.useState(false);
  const [passwordConfirm, setNPasswordConfirm] = React.useState(false);
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
            Developer - Create Password
          </h5>
        </div>
        <div className="login-body">
          <form action="">
            <div className="input-wrap relative">
              <label htmlFor="">New Password</label>
              <input type="text" />

              <button>
                <Eye size={36} strokeWidth={1} />
              </button>
            </div>

            <div className="input-wrap">
              <label htmlFor="">Confirm Password</label>
              <input type="text" />
            </div>

            <ul className="space-y-2 mt-5">
              <li className="flex items-center gap-2 text-xs">
                <Check size={16} /> minimum 8 characters
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Check size={16} /> At least one lowercase character
              </li>

              <li className="flex items-center gap-2 text-xs">
                <Check size={16} /> At least one uppercase character
              </li>

              <li className="flex items-center gap-2 text-xs">
                <Check size={16} /> At least one numeric character
              </li>

              <li className="flex items-center gap-2 text-xs">
                <Check size={16} /> At least 1 symbol character
              </li>
            </ul>

            <button className="btn btn-accent w-full justify-center mt-5">
              Create Password
            </button>
          </form>
        </div>

        <div className="login-message center-all flex-col text-center py-5">
          <CircleCheckBig
            size={50}
            stroke={"#00ff00"}
            className="mb-3 !stroke-[3px]"
          />
          <p className="text-balance mb-5">
            Your password is successfully created. Click the link below to login
          </p>

          <Link
            to={`${devNavUrl}/system/login`}
            className="btn btn-accent w-full justify-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCreatePassword;
