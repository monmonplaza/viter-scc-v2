import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import {
  InputText,
  InputTextOnChange,
} from "@/components/helpers/FormInputs.jsx";
import {
  devNavUrl,
  getUrlParam,
  urlSystem,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import PageNotFound from "@/components/partials/PageNotFound.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setError, setMessage } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Check, CircleCheckBig, Eye, EyeOff, MailCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const DeveloperCreatePassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const paramKey = getUrlParam().get("key");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));

  const [passwordNew, setPasswordNew] = React.useState(true);
  const [passwordConfirm, setPasswordConfirm] = React.useState(true);

  const [lowerValidated, setLowerValidated] = React.useState(false);
  const [upperValidated, setUpperValidated] = React.useState(false);
  const [numberValidated, setNumberValidated] = React.useState(false);
  const [specialValidated, setSpecialValidated] = React.useState(false);
  const [lengthValidated, setLengthValidated] = React.useState(false);

  const {
    isLoading,
    error,
    data: developerKey,
  } = useQueryData(
    `/${ver}/settings-developer/key/${paramKey}`, // endpoint
    "get", // method
    "developerKey" // key
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${ver}/settings-developer/password`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["settings-developer"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setIsSuccess(true);
      }
    },
  });

  const initVal = {
    new_password: "",
    confirm_password: "",
    key: paramKey,
  };

  const yupSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters.")
      .matches("(?=.*[a-z])", "At least one lowercase letter.")
      .matches("(?=.*[A-Z])", "At least one uppercase letter.")
      .matches("(?=.*[!@#$%^&*`{;:',<.>/?}_-])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });

  const handleChange = (value) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*`{;:',<.>/?}_-])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  // React.useEffect(() => {
  //   dispatch(setCreatePassSuccess(true));
  // }, []);

  React.useEffect(() => {
    function setThemeColor() {
      const body = document.querySelector("body");
      body.setAttribute("class", "");
      body.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    setThemeColor();
  }, [theme]);
  return (
    <>
      {isLoading ? (
        <SpinnerTable />
      ) : error ? (
        <ServerError />
      ) : developerKey?.count === 0 ? (
        <PageNotFound />
      ) : (
        <div className="h-screen w-full center-all bg-primary">
          <div className="max-w-[340px] w-full bg-secondary p-4 -translate-y-[100px] sm:-translate-y-[150px] shadow-md">
            <div className="login-header">
              <div className=" flex gap-2 items-center justify-center my-2">
                <div className="p-1 py-2 bg-accent rounded-xl inline-block">
                  <Logo />
                </div>
                <div className="translate-y-1">
                  <h4 className="leading-none uppercase text-[19px] font-medium">
                    Sambahayan
                  </h4>
                  <span className="text-[11px] leading-none -translate-y-2 block font-regular">
                    Consumer Cooperative
                  </span>
                </div>
              </div>

              <h5 className="text-center my-3 text-base">
                Developer - Create Password
              </h5>
            </div>

            {!isSuccess && (
              <div className="login-body">
                <Formik
                  initialValues={initVal}
                  validationSchema={yupSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    mutation.mutate(values);
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <div className="input-wrap relative">
                          <InputTextOnChange
                            label="Password"
                            type={passwordNew ? "password" : "text"}
                            name="new_password"
                            disabled={mutation.isPending}
                            onChange={(e) => handleChange(e.target.value)}
                          />

                          <button
                            onClick={() => setPasswordNew(!passwordNew)}
                            className="absolute top-[30px] right-2"
                            type="button"
                          >
                            {passwordNew ? (
                              <Eye size={20} strokeWidth={1} />
                            ) : (
                              <EyeOff size={20} strokeWidth={1} />
                            )}
                          </button>
                        </div>

                        <div className="input-wrap relative">
                          <InputText
                            label="Confirm password"
                            type={passwordConfirm ? "password" : "text"}
                            name="confirm_password"
                            disabled={
                              mutation.isLoading ||
                              props.values.new_password === ""
                            }
                          />

                          <button
                            onClick={() => setPasswordConfirm(!passwordConfirm)}
                            className="absolute top-[30px] right-2"
                            type="button"
                          >
                            {passwordConfirm ? (
                              <Eye size={20} strokeWidth={1} />
                            ) : (
                              <EyeOff size={20} strokeWidth={1} />
                            )}
                          </button>
                        </div>

                        <ul className="space-y-2 mt-5">
                          <li className="flex items-center gap-2 text-xs">
                            <Check
                              size={16}
                              className={`${
                                lengthValidated
                                  ? "stroke-success"
                                  : "stroke-gray-200"
                              } `}
                            />
                            minimum 8 characters
                          </li>
                          <li className="flex items-center gap-2 text-xs">
                            <Check
                              size={16}
                              className={`${
                                lowerValidated
                                  ? "stroke-success"
                                  : "stroke-gray-200"
                              } `}
                            />{" "}
                            At least one lowercase character
                          </li>

                          <li className="flex items-center gap-2 text-xs">
                            <Check
                              size={16}
                              className={`${
                                upperValidated
                                  ? "stroke-success"
                                  : "stroke-gray-200"
                              } `}
                            />{" "}
                            At least one uppercase character
                          </li>

                          <li className="flex items-center gap-2 text-xs">
                            <Check
                              size={16}
                              className={`${
                                numberValidated
                                  ? "stroke-success"
                                  : "stroke-gray-200"
                              } `}
                            />{" "}
                            At least one numeric character
                          </li>

                          <li className="flex items-center gap-2 text-xs">
                            <Check
                              size={16}
                              className={`${
                                specialValidated
                                  ? "stroke-success"
                                  : "stroke-gray-200"
                              } `}
                            />{" "}
                            At least 1 symbol character
                          </li>
                        </ul>

                        <button className="btn btn-accent w-full justify-center mt-5">
                          Create Password
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            )}

            {isSuccess && (
              <div className="login-message center-all flex-col text-center py-5">
                <CircleCheckBig
                  size={50}
                  stroke={"#00ff00"}
                  className="mb-3 !stroke-[3px]"
                />
                <p className="text-balance mb-5">
                  Your password is successfully created. Click the link below to
                  login
                </p>

                <Link
                  to={`${devNavUrl}/${urlSystem}/login`}
                  className="btn btn-accent w-full justify-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeveloperCreatePassword;
