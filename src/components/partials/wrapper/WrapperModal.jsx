import { StoreContext } from "@/components/store/StoreContext";
import React from "react";

const WrapperModal = (props) => {
  const { store } = React.useContext(StoreContext);

  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-screen z-[9999999999] ${
        store.isAnimating ? "open" : ""
      }`}
    >
      <div
        onClick={props.close}
        className="backdrop w-full h-full bg-black  animate-fadeIn bg-opacity-0 transition-all "
      ></div>
      {props.children}
    </div>
  );
};

export default WrapperModal;
