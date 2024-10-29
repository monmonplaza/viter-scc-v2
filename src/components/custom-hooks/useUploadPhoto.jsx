import React from "react";
import { devApiUrl, fetchFormData } from "../helpers/functions-general";
import { setError, setMessage } from "../store/StoreAction";

const useUploadPhoto = (url, dispatch, isLogo = false) => {
  const [photo, setPhoto] = React.useState(null);

  const uploadPhoto = async () => {
    if (photo) {
      const fd = new FormData();
      fd.append("photo", photo);
      const data = await fetchFormData(devApiUrl + url, fd);
    }
  };

  const handleChangePhoto = (e) => {
    console.log(e.target.files[0]);

    if (!e.target.files[0]) {
      setPhoto("");
      dispatch(setError(false));
      // dispatch(setErrorMessage(""));
      return;
    }

    const img = e.target.files[0];
    const fileNameAndType = e.target.files[0].name.split(".");
    const rename = !isLogo
      ? new File(
          [e.target.files[0]],
          `${fileNameAndType[0].replaceAll(" ", "")}.${fileNameAndType[1]}`,
          { type: img.type }
        )
      : new File([e.target.files[0]], `logo-favicon.${fileNameAndType[1]}`, {
          type: img.type,
        });
    // const rename = new File(
    //   [e.target.files[0]],
    //   `${fileNameAndType[0].replaceAll(" ", "")}-${company_subscriber_code}.${
    //     fileNameAndType[1]
    //   }`,
    //   { type: img.type }
    // );

    console.log("img", img, rename);
    if (img.size > 5000) {
      console.log("NO PHOTO");
      dispatch(setError(true));
      dispatch(
        setMessage(
          "Photo is too big. It should be less than 5Kb for better result."
        )
      );
    } else {
      dispatch(setError(false));
      console.log("Set photo");
      setPhoto(rename);
    }
  };

  return { uploadPhoto, handleChangePhoto, photo };
};

export default useUploadPhoto;
