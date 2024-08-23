import React from "react";

const Pill = ({ isActive }) => {
  return (
    <div
      className={`inline-block text-[8px] text-center rounded-md px-2 w-[50px] ${
        isActive ? "bg-success text-white" : "bg-gray-200 text-gray-500"
      }`}
    >
      {isActive ? "Active" : "Inactive"}{" "}
    </div>
  );
};

export default Pill;
