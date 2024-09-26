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
const ModalDeveloper = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [emailMessage, setEmailMessage] = React.useState("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    error,
    data: role,
  } = useQueryData(`/${ver}/settings-role`, "get", "settings-role");

  const getDeveloperRoleId =
    role?.count > 0 && role?.data.filter((rl) => rl.role_name === "Developer");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/settings-developer/${itemEdit.developer_aid}`
          : `/${ver}/settings-developer`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["settings-developer"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            `Successfully ${
              itemEdit
                ? `updated. ${emailMessage} ${
                    store.credentials.data.developer_email ===
                    itemEdit.developer_email
                      ? "You will be automatically logged out."
                      : ""
                  }`
                : "added, please check your email for verification."
            }`
          )
        );
        if (
          itemEdit &&
          store.credentials.data.developer_email === itemEdit.developer_email
        ) {
          dispatch(setIsAccountUpdated(true));
        }
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
    developer_aid: itemEdit ? itemEdit.developer_aid : "",
    developer_fname: itemEdit ? itemEdit.developer_fname : "",
    developer_lname: itemEdit ? itemEdit.developer_lname : "",
    developer_email: itemEdit ? itemEdit.developer_email : "",
    developer_role_id: "",
    developer_email_old: itemEdit ? itemEdit.developer_email : "",
  };

  const yupSchema = Yup.object({
    developer_fname: Yup.string().required("Required"),
    developer_lname: Yup.string().required("Required"),
    developer_email: Yup.string().required("Required").email("Invalid email"),
  });

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Developer
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            mutation.mutate({
              ...values,
              developer_role_id: getDeveloperRoleId[0].role_aid,
            });
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
                        name="developer_fname"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Last Name"
                        type="text"
                        name="developer_lname"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Email"
                        type="text"
                        name="developer_email"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Role"
                        type="text"
                        name="developer_role_id"
                        value={!isLoading && getDeveloperRoleId[0].role_name}
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

export default ModalDeveloper;
