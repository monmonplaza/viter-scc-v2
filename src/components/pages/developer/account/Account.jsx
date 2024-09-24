import { InputText } from "@/components/helpers/FormInputs";

import {
  devNavUrl,
  urlSystem,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import ModalError from "@/components/partials/modal/ModalError.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import {
  setError,
  setIsAccountUpdated,
  setMessage,
  setSuccess,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const Account = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${ver}/account/developer/update-password`, "put", values),
    onSuccess: (data, values) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["account-password"] });
      // show success box
      if (data.success) {
        values.current_password = "";
        values.new_password = "";
        values.confirm_password = "";

        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            "You password has been successfully changed, you will automatically be logged out."
          )
        );
        dispatch(setIsAccountUpdated(true));

        return;
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        return;
      }
    },
  });

  const userName =
    store.credentials.data.role_is_developer === 1
      ? `${store.credentials.data.developer_fname} ${store.credentials.data.developer_lname}`
      : `${store.credentials.data.user_fname} ${store.credentials.data.user_lname}`;

  const avatarLetter =
    store.credentials.data.role_is_developer === 1
      ? `${store.credentials.data.developer_fname.charAt(
          0
        )}${store.credentials.data.developer_lname.charAt(0)}`
      : `${store.credentials.data.user_fname.charAt(
          0
        )}${store.credentials.data.user_lname.charAt(0)}`;

  const userEmail =
    store.credentials.data.role_is_developer === 1
      ? store.credentials.data.developer_email
      : store.credentials.data.user_email;

  const userId =
    store.credentials.data.role_is_developer === 1
      ? store.credentials.data.developer_aid
      : store.credentials.data.user_aid;

  const initVal = {
    user_id: userId,
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const handleShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const yupSchema = Yup.object({
    current_password: Yup.string().required("Required"),
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[a-z]/, "At least one lowercase letter.")
      .matches(/[A-Z]/, "At least one uppercase letter.")
      .matches("(?=.*[!@#$%^&*-])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper bg-secondary">
              <h1 className="my-5">Account</h1>

              <div className="bg-primary max-w-[500px] p-6">
                <div className="flex gap-4 items-end mb-10">
                  <div className="size-[70px] rounded-full bg-accent center-all text-3xl text-white font-semibold ">
                    {avatarLetter}
                  </div>
                  <div>
                    <h4 className="mb-0 text-xl leading-none">{userName}</h4>
                    <p className="mb-0">{userEmail}</p>
                    <p>{store.credentials.data.role}</p>
                  </div>
                </div>

                <div className="">
                  <h3 className="pb-2 mb-5 border-b border-line">Password</h3>
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
                              type={showCurrentPassword ? "text" : "password"}
                              required={false}
                              name="current_password"
                              className="account_password"
                              label="Current Password"
                            />
                            {props.values.current_password && (
                              <button
                                type="button"
                                className="absolute top-8 text-base text-gray-400 right-3"
                                onClick={handleShowCurrentPassword}
                              >
                                {showCurrentPassword ? (
                                  <Eye size={20} strokeWidth={1} />
                                ) : (
                                  <EyeOff size={20} strokeWidth={1} />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="input-wrap relative">
                            <InputText
                              type={showNewPassword ? "text" : "password"}
                              required={false}
                              name="new_password"
                              className="account_password"
                              label="New Password"
                            />
                            {props.values.confirm_password && (
                              <button
                                type="button"
                                className="absolute top-8 text-base text-gray-400 right-3"
                                onClick={handleShowNewPassword}
                              >
                                {showNewPassword ? (
                                  <Eye size={20} strokeWidth={1} />
                                ) : (
                                  <EyeOff size={20} strokeWidth={1} />
                                )}
                              </button>
                            )}
                          </div>

                          <div className="input-wrap relative">
                            <InputText
                              type={showConfirmPassword ? "text" : "password"}
                              required={false}
                              name="confirm_password"
                              className="account_password"
                              label="Confirm Password"
                            />
                            {props.values.confirm_password && (
                              <button
                                type="button"
                                className="absolute top-8 text-base text-gray-400 right-3"
                                onClick={handleShowConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <Eye size={20} strokeWidth={1} />
                                ) : (
                                  <EyeOff size={20} strokeWidth={1} />
                                )}
                              </button>
                            )}
                          </div>

                          <button className="btn btn-accent mt-5" type="submit">
                            {mutation.isPending && <SpinnerButton />}
                            Reset Password
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {store.success && <ToastSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Account;
