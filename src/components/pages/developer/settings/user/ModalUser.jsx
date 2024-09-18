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
    isLoading,
    isFetching,
    error,
    data: role,
  } = useQueryData(`/${ver}/settings-role`, "get", "settings-role");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/settings-developer/${itemEdit.user_aid}`
          : `/${ver}/settings-developer`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["developer"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
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

  const initVal = {
    user_aid: itemEdit ? itemEdit.user_aid : "",
    user_fname: itemEdit ? itemEdit.user_fname : "",
    user_lname: itemEdit ? itemEdit.user_lname : "",
    user_email: itemEdit ? itemEdit.user_email : "",
    user_role_id: role?.count > 0 ? role?.data[0].role_aid : "",
    user_email_old: itemEdit ? itemEdit.user_email : "",
  };

  const yupSchema = Yup.object({
    user_fname: Yup.string().required("Required"),
    user_lname: Yup.string().required("Required"),
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
            Role
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
                      <InputText
                        label="Role"
                        type="text"
                        name="user_role_id"
                        value={role?.data[0].role_name}
                        disabled
                      />
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
