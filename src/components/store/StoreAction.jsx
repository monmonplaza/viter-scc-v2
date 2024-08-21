export const setError = (val) => {
  return {
    type: "ERROR",
    payload: val,
  };
};

export const setInfo = (val) => {
  return {
    type: "INFO",
    payload: val,
  };
};

export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload: val,
  };
};

export const setValidate = (val) => {
  return {
    type: "VALIDATE",
    payload: val,
  };
};

export const setSuccess = (val) => {
  return {
    type: "SUCCESS",
    payload: val,
  };
};

export const setSave = (val) => {
  return {
    type: "SAVE",
    payload: val,
  };
};

export const setIsDelete = (val) => {
  return {
    type: "IS_DELETE",
    payload: val,
  };
};

export const setIsConfirm = (val) => {
  return {
    type: "CONFIRM",
    payload: val,
  };
};

export const setIsRestore = (val) => {
  return {
    type: "RESTORE",
    payload: val,
  };
};
export const setIsArchive = (val) => {
  return {
    type: "IS_ARCHIVE",
    payload: val,
  };
};

export const setIsEdit = (val) => {
  return {
    type: "IS_EDIT",
    payload: val,
  };
};

export const setIsAdd = (val) => {
  return {
    type: "IS_ADD",
    payload: val,
  };
};

export const setIsUploadFile = (val) => {
  return {
    type: "IS_UPLOAD_FILE",
    payload: val,
  };
};

export const setIsView = (val) => {
  return {
    type: "IS_VIEW",
    payload: val,
  };
};

export const setIsSearch = (val) => {
  return {
    type: "IS_SEARCH",
    payload: val,
  };
};

export const setIsAnimating = (val) => {
  return {
    type: "IS_ANIMATING",
    payload: val,
  };
};

export const setStartIndex = (val) => {
  return {
    type: "START_INDEX",
    payload: val,
  };
};

export const setCreatePassSuccess = (val) => {
  return {
    type: "IS_CREATE_PASS_SUCCCESS",
    payload: val,
  };
};

export const setForgotPassSuccess = (val) => {
  return {
    type: "IS_FORGOT_PASS_SUCCCESS",
    payload: val,
  };
};

export const setIsLogin = (val) => {
  return {
    type: "IS_LOGIN",
    payload: val,
  };
};

export const setIsLogout = (val) => {
  return {
    type: "IS_LOGOUT",
    payload: val,
  };
};

export const setCredentials = (data) => {
  return {
    type: "CREDENTIALS",
    payload: {
      data,
    },
  };
};
