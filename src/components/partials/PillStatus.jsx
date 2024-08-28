import React from "react";

const PillStatus = ({ isActive }) => {
  return (
    <div
      className={`inline-block text-[8px] text-center rounded-md px-2 pt-[1px] w-[60px] text-white ${
        isActive ? "bg-success text-white" : "bg-warning  text-gray-500"
      }`}
    >
      {isActive ? "Complete" : "Ongoing"}
    </div>
  );
};

export default PillStatus;
