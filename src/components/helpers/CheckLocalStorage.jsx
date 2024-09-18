export const checkLocalStorage = () => {
  let localhristoken = null;
  try {
    localhristoken = JSON.parse(localStorage.getItem("localhristoken"));
    // console.log(localhristoken);
  } catch (error) {
    localhristoken = null;
  }

  return localhristoken;
};
