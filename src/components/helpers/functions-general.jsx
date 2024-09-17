//
//
//

export const urlPathSinglePageWebsite =
  "http://localhost/react-vite/viter-scc-v2";
export const imgUrlPathSinglePageWebsite =
  "http://localhost/react-vite/viter-scc-v2/public";

export const devApiUrl = `${urlPathSinglePageWebsite}/rest`;
export const devBaseUrl = `${urlPathSinglePageWebsite}`;
export const devBaseImgUrl = `${imgUrlPathSinglePageWebsite}`;
export const devNavUrl = "";

export const ver = "v2";
export const urlSystem = "system";

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

export const pesoSign = <span className="mx-1"> &#8369; </span>;

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
