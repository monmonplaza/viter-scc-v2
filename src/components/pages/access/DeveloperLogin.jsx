import useSystemIsLogin from "@/components/custom-hooks/useSystemIsLogin.jsx";
import { InputText } from "@/components/helpers/FormInputs.jsx";
import {
  devNavUrl,
  setStorageRoute,
  urlSystem,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { checkRoleToRedirect } from "@/components/helpers/login-functions.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import ModalError from "@/components/partials/modal/ModalError.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import {
  setCredentials,
  setError,
  setIsLogin,
  setMessage,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const DeveloperLogin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const [password, setPassword] = React.useState(true);
  const navigate = useNavigate();
  const { loginLoading } = useSystemIsLogin(navigate);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${ver}/settings-developer/login`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["settings-system-user"] });
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        if (store.isLogin) {
          delete data.data[0].developer_password;
          delete data.data[0].role_description;
          delete data.data[0].role_created;
          delete data.data[0].role_datetime;

          dispatch(setCredentials(data.data[0]));
          setStorageRoute(data.data[1]);
          dispatch(setIsLogin(false));
          checkRoleToRedirect(navigate, data.data[0]);
        }
      }
    },
  });

  const togglePassword = () => setPassword(!password);
  const initVal = {
    developer_email: "",
    password: "",
  };

  const yupSchema = Yup.object({
    developer_email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required"),
  });

  React.useEffect(() => {
    function setThemeColor() {
      const body = document.querySelector("body");
      body.setAttribute("class", "");
      body.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    window.addEventListener("DOMContentLoaded", () => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.body.style.background = "#0d1117";
      } else {
        document.body.style.background = "#fff";
      }
    });

    setThemeColor();
  }, [theme]);
  return (
    <>
      <div className="h-screen w-full center-all bg-primary">
        <div className="max-w-[340px] w-full bg-secondary p-4 -translate-y-[100px]  shadow-md rounded-md">
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

            <h5 className="text-center my-3 text-base">Developer</h5>
          </div>
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
                      <InputText
                        label="Email"
                        type="email"
                        name="developer_email"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap relative">
                      <InputText
                        label="Password"
                        type={password ? "password" : "text"}
                        name="password"
                        disabled={mutation.isPending || !props.dirty}
                      />

                      <button
                        onClick={() => togglePassword(!password)}
                        className="absolute top-[30px] right-2"
                        type="button"
                      >
                        {password ? (
                          <Eye size={20} strokeWidth={1} />
                        ) : (
                          <EyeOff size={20} strokeWidth={1} />
                        )}
                      </button>
                    </div>

                    <button
                      className="btn btn-accent w-full justify-center mt-5"
                      type="submit"
                      disabled={mutation.isPending || !props.dirty}
                    >
                      {mutation.isPending && <SpinnerButton />} Login
                    </button>

                    <a
                      href={`${devNavUrl}/${urlSystem}/forgot-password`}
                      className="text-xs block text-center mt-5 hover:underline"
                    >
                      Forgot Password
                    </a>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      {store.error && <ModalError />}
    </>
  );
};

export default DeveloperLogin;
