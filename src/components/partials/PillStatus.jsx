import React from "react";

const PillStatus = ({ isActive, text = "" }) => {
  return (
    <div
      className={`inline-block text-xs text-center rounded-md px-2 py-[5px] w-[90px] text-white capitalize ${
        isActive ? "bg-success text-white" : "bg-warning  text-gray-500"
      }`}
    >
      <span>
        {isActive
          ? text === ""
            ? "Complete"
            : text
          : text === ""
          ? "Ongoing"
          : text}
      </span>
    </div>
  );
};

export default PillStatus;
