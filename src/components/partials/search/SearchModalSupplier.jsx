import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSearch } from "@/components/helpers/FormInputs";
import { ver } from "@/components/helpers/functions-general";
import { StoreContext } from "@/components/store/StoreContext";
import React from "react";
import SearchNoData from "../icons/SearchNoData";
import SpinnerTable from "../spinners/SpinnerTable";

const SearchModalSupplier = ({
  setData,
  props,
  label,
  name,
  mutation,
  setIsRequiredYup,
  itemEdit = null,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  // client
  const [search, setSearch] = React.useState(
    itemEdit ? props.searchSupplier : ""
  );
  const [onFocus, setOnFocus] = React.useState(false);
  const refSearch = React.useRef();

  const {
    isLoading,
    isFetching,
    data: result,
  } = useQueryData(
    `/${ver}/search-supplier`,
    "post",
    "search-supplier",
    {
      search,
    },
    {
      search,
    }
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value === "") {
      setData(null);
      setSearch("");
    }
  };

  const handleClick = (item) => {
    props.searchSupplier = `${item.supplier_name}`;
    setOnFocus(false);
    setData(item);
    setSearch(item.supplier_name);
  };

  const handleClickOutsideSearch = (e) => {
    // employee
    if (
      refSearch.current !== undefined &&
      refSearch.current !== null &&
      !refSearch.current.contains(e.target)
    ) {
      setOnFocus(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutsideSearch);
    return () =>
      document.removeEventListener("click", handleClickOutsideSearch);
  }, []);

  return (
    <>
      <div className="relative ">
        <label>{label}</label>

        <InputSearch
          type="search"
          placeholder="Search here..."
          onChange={handleChange}
          onFocus={() => {
            setOnFocus(true);
            setIsRequiredYup("");
          }}
          name={name}
          disabled={mutation.isLoading}
          value={search}
          refVal={refSearch}
        />

        {onFocus && (
          <ul
            className={`absolute z-50 overflow-y-auto w-full bg-primary border rounded-md ${
              result?.count > 0 && "h-48"
            }`}
          >
            {isLoading || isFetching ? (
              <SpinnerTable />
            ) : result?.count > 0 ? (
              result?.data.map((item, key) => (
                <button
                  type="button"
                  className={`leading-loose h-fit pl-3 text-xs pr-3 w-full text-left break-all bg-primary hover:bg-dark/5 focus:bg-dark/5  duration-200 cursor-pointer 
                     `}
                  key={key}
                  onClick={() => handleClick(item)}
                >
                  {item.supplier_name}
                </button>
              ))
            ) : (
              <li className=" p-2 w-full text-center bg-primary focus:bg-gray-200 border-b">
                <SearchNoData />
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchModalSupplier;
