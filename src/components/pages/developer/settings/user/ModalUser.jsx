import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { handleEscape, ver } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setError,
  setIsAccountUpdated,
  setIsAdd,
  setIsAnimating,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { File, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
const ModalUser = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [emailMessage, setEmailMessage] = React.useState("");

  const queryClient = useQueryClient();

  const {
    isLoading: roleIsLoading,
    isFetching: roleIsFetching,
    error: roleError,
    data: role,
  } = useQueryData(`/${ver}/settings-role`, "get", "settings-role");

  const getUserRoles =
    role?.data !== undefined &&
    role?.data.filter((item) => item.role_name !== "Developer");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/settings-user/${itemEdit.user_aid}`
          : `/${ver}/settings-user`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["settings-user"] });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            `Successfully ${
              itemEdit
                ? `updated. ${emailMessage} ${
                    store.credentials.data.user_email === itemEdit.user_email
                      ? "You will be automatically logged out."
                      : ""
                  }`
                : "added, please check your email for verification."
            }`
          )
        );
        if (
          itemEdit &&
          store.credentials.data.user_email === itemEdit.user_email
        ) {
          dispatch(setIsAccountUpdated(true));
        }
        dispatch(setIsAdd(false));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 300);
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = itemEdit
    ? { ...itemEdit, user_email_old: itemEdit.user_email }
    : {
        user_aid: "",
        user_fname: "",
        user_lname: "",
        user_email: "",
        user_role_id: "",
        user_email_old: "",
      };

  const yupSchema = Yup.object({
    user_fname: Yup.string().required("Required"),
    user_lname: Yup.string().required("Required"),
    user_role_id: Yup.string().required("Required"),
    user_email: Yup.string().required("Required").email("Invalid email"),
  });

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            User Role
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
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
                <div className=" modal-body  ">
                  <div className="modal-form">
                    <div className="input-wrap">
                      <InputText
                        label="First Name"
                        type="text"
                        name="user_fname"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Last Name"
                        type="text"
                        name="user_lname"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Email"
                        type="text"
                        name="user_email"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputSelect
                        label="Role"
                        type="text"
                        name="user_role_id"
                        required={true}
                        disabled={
                          mutation.isPending || roleIsLoading || roleError
                        }
                      >
                        {roleIsLoading ? (
                          <option value="" hidden>
                            Loading...
                          </option>
                        ) : roleError ? (
                          <option value="" hidden>
                            Error
                          </option>
                        ) : getUserRoles.length === 0 ? (
                          <option value="" hidden>
                            No Data
                          </option>
                        ) : (
                          <optgroup label="Select Role">
                            <option value="" hidden></option>
                            {getUserRoles.map((item, key) => {
                              return (
                                <option value={item.role_aid} key={key}>
                                  {item.role_name}
                                </option>
                              );
                            })}
                          </optgroup>
                        )}
                      </InputSelect>
                    </div>
                  </div>

                  <div className="modal-action ">
                    <button
                      className="btn btn-accent"
                      type="submit"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <SpinnerButton />
                      ) : itemEdit ? (
                        "Save"
                      ) : (
                        "Add"
                      )}
                    </button>
                    <button
                      className="btn btn-discard"
                      type="reset"
                      onClick={handleClose}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </WrapperModal>
  );
};

export default ModalUser;
