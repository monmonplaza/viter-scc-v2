import useTableActions from "@/components/custom-hooks/useTableActions";
import NoData from "@/components/partials/icons/NoData";
import ModalError from "@/components/partials/modal/ModalError";
import ModalValidate from "@/components/partials/modal/ModalValidate";
import ToastSuccess from "@/components/partials/ToastSuccess";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import CompanyInfoList from "./CompanyInfoList";
import ModalCompanyInfo from "./ModalCompanyInfo";

const CompanyInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const { handleEdit } = useTableActions({
    setItemEdit,
  });

  return (
    <>
      <div className="main-wrapper px-2 bg-secondary">
        <div className="flex justify-between items-center mb-5">
          <div className="flex ">
            <h3 className="mb-0 ">Company Information</h3>
          </div>
          {store.credentials.data.company_info !== null ? (
            <button
              className="btn btn-accent h-[34px]"
              onClick={() =>
                handleEdit(
                  store.credentials?.data.company_info[0].company_info_aid,
                  store.credentials?.data.company_info[0]
                )
              }
            >
              <Plus size={14} className="!stroke-[2px]" /> Update
            </button>
          ) : (
            <button className="btn btn-accent h-[34px]" onClick={handleAdd}>
              <Plus size={14} className="!stroke-[2px]" /> Update
            </button>
          )}
        </div>

        <div className="relative ">
          <div className="table-wrapper md:w-full p-3">
            {store.credentials.data.company_info !== null ? (
              <>
                <CompanyInfoList
                  item={store.credentials?.data.company_info[0]}
                />
              </>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>

      {store.isAdd && <ModalCompanyInfo itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <ToastSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CompanyInfo;
