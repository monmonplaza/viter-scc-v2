import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs hidden md:block">
      <ul>
        <li>
          <Link to="#">Settings</Link>
        </li>
        <li>
          <Link to="#">Settings 1</Link>
        </li>
        <li>
          <Link to="#">Settings 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
