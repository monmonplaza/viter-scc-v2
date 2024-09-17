import useQueryData from "@/components/custom-hooks/useQueryData";
import { ver } from "@/components/helpers/functions-general";
import NoData from "@/components/partials/icons/NoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import { Archive, Plus, SquarePen } from "lucide-react";

const SalesProductList = ({ setIsAdd, setItemEdit, row }) => {
  let counter = 1;
  const handleAdd = () => {
    setItemEdit(null);
    setIsAdd(true);
  };

  const { isLoading, error, data } = useQueryData(
    `/${ver}/receiving-supply/${row.receiving_aid}`, // endpoint
    "get", // method
    "receiving-supply" // key
  );

  // const getAmount =
  //   !isLoading &&
  //   data.data.reduce((currentTotal, item) => {
  //     return Number(item.receiving_supply_amount) + currentTotal;
  //   }, 0);

  return (
    <>
      <div className=" supplier-filter flex  items-center gap-5">
        <div className="input-wrap">
          <label htmlFor="">Search Supplier</label>
          <select name="" id="">
            <option value="2">supplier 1</option>
            <option value="2">supplier 2</option>
            <option value="2">supplier 3</option>
          </select>
        </div>

        <div className="input-wrap">
          <label htmlFor="">Search Product</label>
          <select name="" id="">
            <option value="2">product 1</option>
            <option value="2">product 2</option>
            <option value="2">product 3</option>
          </select>
        </div>

        <button
          className="btn btn-accent self-end py-1.5 mb-1 ml-auto"
          onClick={handleAdd}
        >
          <Plus />
          Add
        </button>
      </div>

      <div className="table-wrapper-modal ">
        <table>
          <thead>
            <tr>
              <th className="w-counter">#</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={10}>
                  <ServerError />
                </td>
              </tr>
            )}

            {isLoading ? (
              <tr>
                <td colSpan={10}>
                  <LoaderTable />
                </td>
              </tr>
            ) : data.data.length === 0 ? (
              <tr>
                <td colSpan={10}>
                  <NoData />
                </td>
              </tr>
            ) : (
              data.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td className="w-counter">{counter++}</td>
                    <td>{item.supplier_name}</td>
                    <td>{item.product_name}</td>
                    <td>{item.receiving_supply_quantity}</td>
                    <td>{item.receiving_supply_price}</td>
                    <td>{item.receiving_supply_unit_id}</td>
                    <td>{item.receiving_supply_amount}</td>
                    <td className="table-action">
                      <ul>
                        <li>
                          <button data-tooltip="Edit" className="tooltip">
                            <SquarePen size={14} />
                          </button>
                        </li>

                        <li>
                          <button data-tooltip="Archive" className="tooltip">
                            <Archive size={14} />
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <h3 className="my-10">
          {/* Total: {isLoading ? <SpinnerButton /> : getAmount} */}
        </h3>
      </div>
    </>
  );
};

export default SalesProductList;
