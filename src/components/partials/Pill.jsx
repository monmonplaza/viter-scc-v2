import React from "react";

const Pill = ({ isActive }) => {
  return (
    <div
      className={`inline-block text-xs text-center rounded-md px-2 py-[5px] w-[70px] capitalize  ${
        isActive ? "bg-success text-white" : "bg-gray-200 text-gray-500"
      }`}
    >
      <span>{isActive ? "Active" : "Inactive"} </span>
    </div>
  );
};

export default Pill;
