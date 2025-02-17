import React from "react";
//
// export const urlPathSinglePageWebsite =
//   "http://localhost/react-vite/viter-scc-v2";
// export const imgUrlPathSinglePageWebsite =
//   "http://localhost/react-vite/viter-scc-v2/public/img";

// Online Dev only
export const urlPathSinglePageWebsite = "https://app.sambahayancoop.com";
export const imgUrlPathSinglePageWebsite = "https://app.sambahayancoop.com/img";

export const devApiUrl = `${urlPathSinglePageWebsite}/rest`;
export const devBaseUrl = `${urlPathSinglePageWebsite}`;
export const devBaseImgUrl = `${imgUrlPathSinglePageWebsite}`;
export const devNavUrl = "/v2";

export const ver = "v2";
export const urlSystem = "developer";
export const urlAdmin = "admin";
export const urlCashier = "cashier";

// test
export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

export const setTimeZone = "Asia/Taipei";

export const handleEscape = (exitFn) => {
  function handleKeyDown(e) {
    e.keyCode === 27 && exitFn();
  }
  document.addEventListener("keydown", handleKeyDown);
  return function cleanup() {
    document.removeEventListener("keydown", handleKeyDown);
  };
};

// format the numbers separated by comma
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// format the numbers separated by comma
export const numberWithCommasToFixed = (item, x) => {
  let result = "0.00";

  if (typeof item !== "undefined" && item !== "") {
    result = numberWithCommas(Number(item).toFixed(x));
  }
  return result;
};

export const pesoSign = <span className=""> &#8369; </span>;

export const formatDate = (dateVal, val = "", format = "") => {
  const formatedDate = val;
  if (typeof dateVal !== "undefined" && dateVal !== "") {
    // formatting date
    const event = new Date(dateVal);

    return event.toLocaleString("en", options(format));
  }
  return formatedDate;
};

// formatting date and time
export const options = (format) => {
  const options =
    format === "with-weeks"
      ? {
          timeZone: setTimeZone,
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      : {
          timeZone: setTimeZone,
          month: "long",
          day: "numeric",
          year: "numeric",
        };

  return options;
};

export const getDateNow = () => {
  const newDate = new Date().toLocaleString("en", {
    timeZone: setTimeZone,
  });

  return new Date(newDate.toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split("T")[0];
};

// get the url id parameter
export const getUrlParam = (id) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const param = urlParams.get(id);
  // return param;
  return urlParams;
};

export function setStorageRoute(jwt, isDev) {
  localStorage.setItem("localhristoken", JSON.stringify({ token: jwt, isDev }));
}

export function formatInPeso(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(number);
}

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpoint error");
    });
  return data;
};

export const hexToRgb = (hex) => {
  let result = "";

  if (typeof hex !== "undefined" && hex !== "") {
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    result = `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
      result[3],
      16
    )} `;
  }

  return result;
};
