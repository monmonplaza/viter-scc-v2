import { LogOut, Mail, Menu, Moon, Sun, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { devNavUrl } from "../helpers/functions-general.jsx";
import { setIsLogout, setIsShowMobileNav } from "../store/StoreAction.jsx";
import { StoreContext } from "../store/StoreContext.jsx";
import Logo from "./icons/Logo.jsx";
import ModalLogout from "./modal/ModalLogout.jsx";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [show, setShow] = React.useState(false);
  const [isDark, setIsDark] = React.useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));

  let menuRef = React.useRef();

  const handleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.querySelector("html").classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.querySelector("html").classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  React.useEffect(() => {
    let handleShowDropdown = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleShowDropdown);
    return () => {
      document.removeEventListener("mousedown", handleShowDropdown);
    };
  }, []);

  React.useEffect(() => {
    function setThemeColor() {
      const body = document.querySelector("html");
      body.setAttribute("class", "");
      body.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    setThemeColor();
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("localhristoken");
    store.credentials.data.role_is_developer === 1
      ? window.location.replace(`${devNavUrl}/developer/login`)
      : window.location.replace(`${devNavUrl}/login`);
  };

  const getUserCredentialByRole = () => {
    if (store.credentials?.data.role_is_developer === 1) {
      return {
        name: `${store.credentials?.data.developer_fname}`,
        fullname: `${store.credentials?.data.developer_fname} ${store.credentials?.data.developer_lname}`,
        email: store.credentials?.data.developer_email,
        letter: `${store.credentials?.data.developer_fname.charAt(
          0
        )}${store.credentials?.data.developer_lname.charAt(0)}`,
      };
    } else {
      return {
        name: `${store.credentials?.data.user_fname}`,
        fullname: `${store.credentials?.data.user_fname} ${store.credentials?.data.user_lname} `,
        email: store.credentials?.data.user_email,
        letter: `${store.credentials?.data.user_fname.charAt(
          0
        )}${store.credentials?.data.user_lname.charAt(0)}`,
      };
    }
  };

  const handleShowMobileNav = () =>
    dispatch(setIsShowMobileNav(!store.isShowMobileNav));

  return (
    <>
      <header className="p-4 flex justify-between items-center bg-primary border-b border-line">
        <div className="flex gap-5 items-center">
          {store.credentials?.data.role_is_cashier === 1 && (
            <div className=" flex gap-2 items-center ">
              <div className="p-1 py-2 bg-accent rounded-xl inline-block -translate-y-1">
                <Logo />
              </div>
            </div>
          )}

          <div>
            <h3 className="leading-none uppercase text-[clamp(14px,4vw,19px)] font-medium">
              Inventory and Sales
            </h3>
            <p className="mb-0 text-sm">Management System</p>
          </div>
        </div>
        <div className="profile flex items-center gap-3">
          <div
            className="flex items-center border border-line rounded-2xl p-1 leading-none w-[40px] cursor-pointer hover:border-accent transition-all bg-secondary"
            onClick={handleTheme}
          >
            <button
              className={` transition-all ${
                isDark ? "translate-x-4" : "translate-x-0"
              }`}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <h4 className="mb-0 leading-none font-medium">
                Hi
                <span className="pl-1">{getUserCredentialByRole().name},</span>
              </h4>
              <small className="leading-none text-xs block">
                {store.credentials?.data.role}
              </small>
            </div>
            <div ref={menuRef} className="relative">
              <div
                className="uppercase size-8 bg-accent text-white center-all rounded-full cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {getUserCredentialByRole().letter}
              </div>
              <div
                className={`absolute top-[110%] border right-3  w-[250px] p-2 rounded-md border-line bg-primary z-[9999999] ${
                  show ? "" : "hidden"
                }`}
              >
                <div className=" flex gap-2 items-center mb-2">
                  <div className="center-all gap-3 bg-accent text-white size-6 rounded-full text-xs uppercase">
                    {getUserCredentialByRole().letter}
                  </div>

                  <div className="translate-y-1">
                    <h5 className="text-xs leading-none mb-0">
                      {" "}
                      {getUserCredentialByRole().fullname}
                    </h5>
                    <small className="text-[10px]  block">
                      {store.credentials?.data.role_name}
                    </small>
                  </div>
                </div>
                <ul className="">
                  <li className="flex gap-4 items-center py-2 text-xs px-1">
                    <Mail size={15} />
                    <span className="truncate w-[200px] block">
                      {getUserCredentialByRole().email}
                    </span>
                  </li>
                  <li className="border-y border-line ">
                    <Link
                      to={`${devNavUrl}/${store.credentials?.data.role_name.toLowerCase()}/account`}
                      className="flex gap-4 items-center text-xs w-full hover:bg-secondary transition-colors py-2 px-1"
                    >
                      <UserPen size={15} /> Profile
                    </Link>
                  </li>
                  <li className="">
                    <button
                      onClick={handleLogout}
                      className="flex gap-4 items-center text-xs w-full hover:bg-secondary transition-colors py-2 px-1"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button className="md:hidden" onClick={handleShowMobileNav}>
            <Menu size={30} />
          </button>
        </div>
      </header>

      {store.isLogout && <ModalLogout msg="Are you sure you want to logout?" />}
    </>
  );
};

export default Header;
