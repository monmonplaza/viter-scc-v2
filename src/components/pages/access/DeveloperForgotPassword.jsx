import { InputText } from "@/components/helpers/FormInputs.jsx";
import {
  devNavUrl,
  urlSystem,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import ModalError from "@/components/partials/modal/ModalError.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import { setError, setMessage } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { MailCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const DeveloperForgotPassword = () => {
  const queryClient = useQueryClient();
  const { store, dispatch } = React.useContext(StoreContext);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${ver}/settings-developer/reset`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["system"] });
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
    email: "",
  };

  const yupSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email."),
  });

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
      <div className="h-screen w-full center-all bg-primary">
        <div className="max-w-[340px] w-full bg-secondary p-4 -translate-y-[100px] sm:-translate-y-[150px] shadow-md rounded-md">
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
              Developer - Forgot Password
            </h5>
          </div>

          {isSuccess ? (
            <div className="login-message center-all flex-col text-center py-5">
              <MailCheck size={60} stroke={"#00ff00"} className="mb-3" />
              <p className="text-balance">
                We have successfully send the instruction to your email.{" "}
              </p>

              <a
                href={`${devNavUrl}/${urlSystem}/login`}
                className="btn btn-accent w-1/2 text-center mt-5 center-all"
              >
                Back to Login
              </a>
            </div>
          ) : (
            <div className="login-body">
              <p>
                Enter your registered email to receive instruction on how to
                reset your password
              </p>
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
                      <div className="input-wrap">
                        <InputText
                          label="Email"
                          type="text"
                          name="email"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <button
                        className="btn btn-accent w-full justify-center mt-5"
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                      >
                        {mutation.isPending && <SpinnerButton />} Reset Password
                      </button>
                    </Form>
                  );
                }}
              </Formik>

              <p className="mt-5 text-center">
                Go back to
                <a
                  href={`${devNavUrl}/${urlSystem}/login`}
                  className="w-full text-content pl-1 hover:underline"
                >
                  <u>Login</u>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {store.error && <ModalError />}
    </>
  );
};

export default DeveloperForgotPassword;
