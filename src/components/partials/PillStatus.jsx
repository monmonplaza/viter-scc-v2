import React from "react";

const PillStatus = ({ isActive, text = "" }) => {
  return (
    <div
      className={`inline-block text-[8px] text-center rounded-md px-2 pt-[1px] w-[60px] text-white ${
        isActive ? "bg-success text-white" : "bg-warning  text-gray-500"
      }`}
    >
      {isActive ? (text === "" ? "Complete" : text) : "Ongoing"}
    </div>
  );
};

export default PillStatus;
