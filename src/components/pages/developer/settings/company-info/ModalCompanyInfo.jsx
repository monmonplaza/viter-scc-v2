import useUploadPhoto from "@/components/custom-hooks/useUploadPhoto";
import { InputPhotoUpload, InputText } from "@/components/helpers/FormInputs";
import {
  devBaseImgUrl,
  handleEscape,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setIsAdd,
  setIsAnimating,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { File, Image, ImageUp, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
const ModalCompanyInfo = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [secondaryColor, setSecondaryColor] = React.useState(
    itemEdit ? itemEdit.company_info_color_secondary : "#ffffff"
  );
  const [accentColor, setAccentColor] = React.useState(
    itemEdit ? itemEdit.company_info_color_accent : "#01596f"
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/company-info/${itemEdit.company_info_aid}`
          : `/${ver}/company-info`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["company-info"],
      });

      window.location.reload();
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully updated.`));
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

  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    `/${ver}/upload-photo`,
    dispatch,
    true
  );

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = itemEdit
    ? {
        ...itemEdit,
        company_info_name_old: itemEdit.company_info_name,
        street_name: itemEdit.company_info_name,
        city_name: itemEdit.company_info_address.split("^")[0],
        province_name: itemEdit.company_info_address.split("^")[1],
        postal_name: itemEdit.company_info_address.split("^")[2],
        country_name: itemEdit.company_info_address.split("^")[3],
      }
    : {
        company_info_name: "",
        company_info_email: "",
        company_info_phone: "",
        company_info_mobile: "",
        company_info_address: "",
        company_info_color_accent: "",
        company_info_color_secondary: "",
        street_name: "",
        city_name: "",
        province_name: "",
        postal_name: "",
        country_name: "",
      };

  const yupSchema = Yup.object({
    company_info_name: Yup.string().required("Require"),
    company_info_email: Yup.string()
      .required("Required")
      .email("Invalid email."),
    company_info_phone: Yup.string().required("Require"),
    company_info_mobile: Yup.string().required("Require"),
  });

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Company Info
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const address = `${values.street_name}^ ${values.city_name}^ ${values.province_name}^ ${values.postal_name}^ ${values.country_name}`;

            mutation.mutate({
              ...values,
              company_info_address: address,
              company_info_color_secondary: secondaryColor,
              company_info_color_accent: accentColor,
              company_info_logo:
                (itemEdit?.company_info_logo === "" && photo) ||
                (!photo && "") ||
                (photo === undefined && "") ||
                (photo && itemEdit?.company_info_logo !== photo?.name)
                  ? photo?.name || ""
                  : itemEdit?.company_info_logo || "",
            });
            uploadPhoto();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className=" modal-body  ">
                  <div className="modal-form">
                    <div className="relative w-fit m-auto mb-2 group">
                      {itemEdit === null && photo === null ? (
                        <div className="group-hover:opacity-20 mb-4 flex items-center gap-2 min-h-[44px] min-w-[170px] max-h-[44px] max-w-[170px] border rounded-md p-2">
                          <Image className="w-12 h-8" />
                          <h5 className="mb-0 leading-tight">Company Logo</h5>
                        </div>
                      ) : (itemEdit?.company_info_logo === "" &&
                          photo === null) ||
                        photo === "" ? (
                        <div className="group-hover:opacity-20 mb-4 flex items-center gap-2 min-h-[44px] min-w-[170px] max-h-[44px] max-w-[170px] border rounded-md p-2">
                          <Image className="w-12 h-8" />
                          <h5 className="mb-0 leading-tight">Company Logo</h5>
                        </div>
                      ) : (
                        <img
                          src={
                            photo
                              ? URL.createObjectURL(photo) // preview
                              : devBaseImgUrl +
                                "/" +
                                itemEdit?.company_info_logo // check db
                          }
                          alt="employee photo"
                          className="cursor-pointer group-hover:opacity-30 duration-200 relative min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] object-fill object-[50%,50%] m-auto"
                        />
                      )}
                      <ImageUp className="opacity-0 duration-200 group-hover:opacity-100 fill-dark/90 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" />
                      <InputPhotoUpload
                        name="photo"
                        type="file"
                        id="myFile"
                        accept="image/*"
                        title="Upload photo"
                        onChange={(e) =>
                          handleChangePhoto(e, initVal.company_subscriber_code)
                        }
                        className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px]"
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Company Name"
                        type="text"
                        name="company_info_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Company Email"
                        type="text"
                        name="company_info_email"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Company Phone"
                        type="text"
                        name="company_info_phone"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Company Mobile number"
                        type="text"
                        name="company_info_mobile"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Street"
                        type="text"
                        name="street_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="City"
                        type="text"
                        name="city_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Province"
                        type="text"
                        name="province_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="postal"
                        type="text"
                        name="postal_name"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputText
                        label="country"
                        type="text"
                        name="country_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <label htmlFor="" className="custom">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="!p-1"
                      />
                    </div>

                    <div className="input-wrap">
                      <label htmlFor="" className="custom">
                        Sub Menu Color
                      </label>
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="!p-1"
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

export default ModalCompanyInfo;
