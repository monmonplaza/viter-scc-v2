import { ver } from "@/components/helpers/functions-general";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { PillBottle, X } from "lucide-react";
import React from "react";

import SupplierProductForm from "./supplier-product/SupplierProductForm";
import SupplierProductList from "./supplier-product/SupplierProductList";

const ModalSupplierProduct = ({ setShowManageSupplierProduct, row }) => {
  const [isAdd, setIsAdd] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);

  const [isDelete, setIsDelete] = React.useState(null);
  const [isConfirm, setIsConfirm] = React.useState(null);
  const [isActive, setIsActive] = React.useState(1);

  const handleClose = () => setShowManageSupplierProduct(false);

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[900px] border border-line mx-2">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              Manage Supplier Product
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h5>Date: {row.receiving_date}</h5>
              <h5>Reference: {row.receiving_reference_no}</h5>
            </div>

            {!isAdd && (
              <SupplierProductList
                setIsAdd={setIsAdd}
                setItemEdit={setItemEdit}
                row={row}
              />
            )}

            {isAdd && (
              <SupplierProductForm
                itemEdit={itemEdit}
                setIsAdd={setIsAdd}
                row={row}
              />
            )}
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalSupplierProduct;
