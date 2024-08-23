import { LogOut, Mail, Moon, Sun, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [show, setShow] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));

  let menuRef = React.useRef();

  const handleTheme = () => {
    if (isDark) {
      document.querySelector("body").classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.querySelector("body").classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
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
      const body = document.querySelector("body");
      body.setAttribute("class", "");
      body.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    setThemeColor();
  }, [theme]);

  return (
    <header className="p-4 flex justify-end bg-primary border-b border-line">
      <div className="profile flex items-center gap-3">
        <div
          className="flex items-center border border-line rounded-2xl p-1 leading-none w-[48px] cursor-pointer hover:border-accent transition-all bg-secondary"
          onClick={handleTheme}
        >
          <button
            className={` transition-all ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <h4 className="mb-0 leading-none font-medium">Hi Ramon,</h4>
            <small className="leading-none text-xs  block">Admin</small>
          </div>
          <div ref={menuRef} className="relative">
            <div
              className="size-8 bg-accent text-white center-all rounded-full cursor-pointer"
              onClick={() => setShow(!show)}
            >
              RP
            </div>
            <div
              className={`absolute top-[110%] border right-3  w-[250px] p-2 rounded-md border-line bg-primary z-[9999999] ${
                show ? "" : "hidden"
              }`}
            >
              <div className=" flex gap-2 items-center mb-2">
                <div className="center-all gap-3 bg-accent text-white size-6 rounded-full text-xs">
                  RP
                </div>

                <div className="translate-y-1">
                  <h5 className="text-sm leading-none">Ramon Plaza</h5>
                  <small className="text-[10px]  block">administrator</small>
                </div>
              </div>
              <ul className="">
                <li className="flex gap-4 items-center py-2 text-xs px-1">
                  <Mail size={15} />
                  <span className="truncate w-[200px] block">
                    ramon.plaza@frontlinebusiness.com.ph
                  </span>
                </li>
                <li className="border-y border-line ">
                  <Link
                    to="#"
                    className="flex gap-4 items-center text-xs w-full hover:bg-secondary transition-colors py-2 px-1"
                  >
                    <UserPen size={15} /> Profile
                  </Link>
                </li>
                <li className="">
                  <button className="flex gap-4 items-center text-xs w-full hover:bg-secondary transition-colors py-2 px-1">
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
