import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen grid place-content-center bg-primary text-body isolate">
      <div className="relative max-w-[600px] text-center">
        <h1 className="text-[clamp(160px,_20vw,_560px)]  font-extrabold absolute md: -top-[10vw] md:-top-[12vw] left-1/2 -translate-x-1/2 opacity-10 -z-[99] leading-none">
          404
        </h1>
        <h2 className="text-[clamp(30px,_5vw,_40px)] mb-8">
          We are sorry, page not found
        </h2>
        <p className="text-xl mb-10 ">
          The page you are looking for might have been remove, change the name
          or temporary unavailable
        </p>
        <button className="btn btn-accent mx-auto" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
