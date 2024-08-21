import React from "react";
import { setIsAnimating } from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";

export const urlPathSinglePageWebsite =
  "http://localhost/react-vite/viter-viter-scc-v2";
export const imgUrlPathSinglePageWebsite =
  "http://localhost/react-vite/viter-viter-scc-v2/public";

export const devApiUrl = `${urlPathSinglePageWebsite}/rest`;
export const devBaseUrl = `${urlPathSinglePageWebsite}`;
export const devBaseImgUrl = `${imgUrlPathSinglePageWebsite}`;
export const devNavUrl = "";

export const ver = "v2";

export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

export const handleEscape = (exitFn) => {
  function handleKeyDown(e) {
    e.keyCode === 27 && exitFn();
  }
  document.addEventListener("keydown", handleKeyDown);
  return function cleanup() {
    document.removeEventListener("keydown", handleKeyDown);
  };
};
