import { Search } from "lucide-react";
import { setIsSearch } from "../store/StoreAction.jsx";

const SearchBar = ({
  search,
  dispatch,
  store,
  result,
  isFetching,
  setOnSearch,
  onSearch,
}) => {
  const handleChange = (e) => {
    if (e.target.value === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = search.current.value;

    if (val === " " || val === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
      return;
      // dispatch(setError(true));
      // dispatch(setMessage("Search keyword cannot be space only or blank."));
    } else {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(true));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="search-box"
    >
      <div className="input-wrap search relative w-full md:w-auto">
        <div
          type="submit"
          className="absolute left-0 top-4 text-[14px] cursor-default"
        >
          <Search size={20} />
        </div>
        <input
          type="search"
          placeholder="Search here..."
          className="pl-10"
          ref={search}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
