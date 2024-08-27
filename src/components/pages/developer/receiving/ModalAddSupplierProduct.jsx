import { handleEscape, ver } from "@/components/helpers/functions-general";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  Archive,
  ArchiveRestore,
  Pill,
  PillBottle,
  Plus,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton";
import useQueryData from "@/components/custom-hooks/useQueryData";
import { StoreContext } from "@/components/store/StoreContext";
import { setIsAdd, setIsAnimating } from "@/components/store/StoreAction";
import ServerError from "@/components/partials/icons/ServerError";
import NoData from "@/components/partials/icons/NoData";
import LoaderTable from "@/components/partials/LoaderTable";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import SearchModalSupplier from "@/components/partials/search/SearchModalSupplier";
import SearchModalProduct from "@/components/partials/search/SearchModalProduct";
import useTableActions from "@/components/custom-hooks/useTableActions";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalConfirm from "@/components/partials/modal/ModalConfirm";

const ModalAddSupplierProduct = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [supplierData, setSupplierData] = React.useState(null);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isRequiredSupplierYup, setIsRequiredSupplierYup] = React.useState("");
  const [productData, setProductData] = React.useState(null);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  let counter = 1;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${ver}/receiving-supply`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["receiving"],
      });

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

  const [
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    aid,
    data,
    isActive,
  ] = useTableActions({
    setItemEdit,
  });

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setSupplierData(null);
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 300);
  };

  const handleSearch = () => {
    if (supplierData === null || typeof supplierData === "undefined") {
      setIsRequiredSupplierYup(Yup.string().required("Required"));
    }
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = {
    receiving_date: "",
    receiving_supply_received_id: "",
    receiving_supply_unit_id: "",
    receiving_supply_quantity: "",
    receiving_supply_price: "",
    searchSupplier: "",
    searchProduct: "",
  };

  const yupSchema = Yup.object({
    receiving_date: Yup.string().required("Require"),
    receiving_supply_unit_id: Yup.string().required("Require"),
    receiving_supply_quantity: Yup.string().required("Require"),
    receiving_supply_price: Yup.string().required("Require"),
    searchSupplier: isRequiredSupplierYup,
    searchProduct: isRequiredProductYup,
  });

  const {
    isLoading: loadingUnit,
    error: errorUnit,
    data: unitData,
  } = useQueryData(
    `/${ver}/receiving/read-all-unit`, // endpoint
    "get", // method
    "receiving-read-all-unit" // key
  );

  const {
    isLoading: loadingReceiving,
    isFetching: fetchingReceiving,
    error: errorReceiving,
    data: receivingData,
  } = useQueryData(
    `/${ver}/receiving-supply/read-new-receive`, // endpoint
    "get", // method
    "receiving-supply-read-new-receive" // key
  );
  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2">
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
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const receiving_supply_supplier_id =
                  supplierData !== null ? supplierData?.supplier_aid : 0;
                const receiving_supply_product_id =
                  productData !== null ? productData?.product_aid : 0;

                const receiving_supply_amount =
                  Number(values.receiving_supply_price) *
                  Number(values.receiving_supply_quantity);

                mutation.mutate({
                  ...values,
                  receiving_supply_amount,
                  receiving_supply_supplier_id,
                  receiving_supply_product_id,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="flex justify-between my-2">
                      <div className="input-wrap">
                        <InputText
                          label="Receiving Date"
                          type="date"
                          name="receiving_date"
                          disabled={mutation.isPending}
                        />
                      </div>
                    </div>

                    <div className="md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_5rem] gap-4 mb-5 items-end">
                      <div className="input-wrap">
                        <SearchModalSupplier
                          setData={setSupplierData}
                          props={props}
                          label="Search Supplier"
                          name="searchSupplier"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredSupplierYup}
                        />
                      </div>
                      <div className="input-wrap">
                        <SearchModalProduct
                          setData={setProductData}
                          props={props}
                          label="Search Product"
                          name="searchProduct"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredProductYup}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Qty"
                          type="text"
                          number="number"
                          name="receiving_supply_quantity"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Unit"
                          name="receiving_supply_unit_id"
                          disabled={mutation.isLoading || loadingUnit}
                        >
                          {loadingUnit ? (
                            <option value="" hidden>
                              Loading...
                            </option>
                          ) : errorUnit ? (
                            <option value="" disabled>
                              Error
                            </option>
                          ) : (
                            <optgroup label="Select unit">
                              <option value="" hidden></option>
                              {unitData?.data.length > 0 ? (
                                <>
                                  {unitData?.data.map((cItem, key) => {
                                    return (
                                      cItem.settings_unit_is_active === 1 && (
                                        <option
                                          value={cItem.settings_unit_aid}
                                          key={key}
                                        >
                                          {cItem.settings_unit_name}
                                        </option>
                                      )
                                    );
                                  })}
                                </>
                              ) : (
                                <option value="" disabled>
                                  No data
                                </option>
                              )}
                            </optgroup>
                          )}
                        </InputSelect>
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          number="number"
                          name="receiving_supply_price"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <button
                        className="btn btn-accent ml-auto md:mt-0 mt-5 !py-1 md:text-left md:mb-2"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={handleSearch}
                      >
                        {mutation.isPending ? (
                          <SpinnerButton />
                        ) : (
                          <>
                            <Plus /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            <div className="relative">
              {!loadingReceiving && fetchingReceiving && <SpinnerTable />}
              <div className="table-wrapper w-full">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Supplier</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {((loadingReceiving && !fetchingReceiving) ||
                      receivingData?.data.length === 0) && (
                      <tr>
                        <td colSpan="100%">
                          {loadingReceiving ? (
                            <LoaderTable count={30} cols={6} />
                          ) : (
                            <NoData />
                          )}
                        </td>
                      </tr>
                    )}
                    {errorReceiving && (
                      <tr>
                        <td colSpan="100%" className="p-10">
                          <ServerError />
                        </td>
                      </tr>
                    )}

                    {receivingData?.data.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td className="w-counter">{counter++}.</td>
                          <td>
                            <Pill isActive={item.settings_unit_is_active} />
                          </td>
                          <td>{item.supplier_name}</td>

                          <td>{item.product_name}</td>
                          <td>{item.receiving_supply_quantity}</td>
                          <td>{item.receiving_supply_price}</td>
                          <td>{item.settings_unit_name}</td>
                          <td className="text-right">
                            {item.receiving_supply_amount}
                          </td>

                          <td className="table-action">
                            <ul>
                              {item.settings_unit_is_active === 1 ? (
                                <>
                                  <li>
                                    <button
                                      data-tooltip="Edit"
                                      className="tooltip"
                                      onClick={() =>
                                        handleEdit(item.settings_unit_aid, item)
                                      }
                                    >
                                      <SquarePen size={14} />
                                    </button>
                                  </li>

                                  <li>
                                    <button
                                      data-tooltip="Archive"
                                      className="tooltip"
                                      onClick={() =>
                                        handleArchive(
                                          item.settings_unit_aid,
                                          item
                                        )
                                      }
                                    >
                                      <Archive size={14} />
                                    </button>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <button
                                      data-tooltip="Restore"
                                      className="tooltip"
                                      onClick={() =>
                                        handleRestore(
                                          item.settings_unit_aid,
                                          item
                                        )
                                      }
                                    >
                                      <ArchiveRestore size={14} />
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      data-tooltip="Delete"
                                      className="tooltip"
                                      onClick={() =>
                                        handleRemove(
                                          item.settings_unit_aid,
                                          item
                                        )
                                      }
                                    >
                                      <Trash size={14} />
                                    </button>
                                  </li>
                                </>
                              )}
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h3 className="text-right mt-5">Total: 2000</h3>
              </div>
            </div>

            <div className="flex gap-3 mt-5 justify-end">
              <button className="btn btn-accent" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>

        {store.isDelete && (
          <ModalDelete
            mysqlApiDelete={`/${ver}/product/${aid}`}
            queryKey="product"
            item={data.product_name}
          />
        )}
        {store.isConfirm && (
          <ModalConfirm
            mysqlApiArchive={`/${ver}/product/active/${aid}`}
            queryKey="product"
            item={data.product_name}
            active={isActive}
          />
        )}
      </WrapperModal>
    </>
  );
};

export default ModalAddSupplierProduct;
