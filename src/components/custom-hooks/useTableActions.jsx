import React from "react";
import { setIsAdd, setIsConfirm, setIsDelete } from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";

const useTableActions = ({ setItemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [data, setData] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const handleRemove = (aid, item) => {
    setId(aid);
    dispatch(setIsDelete(true));
    setData(item);
  };
  const handleEdit = (aid, item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleArchive = (aid, item) => {
    setId(aid);
    dispatch(setIsConfirm(true));
    setIsActive(false);
    setData(item);
  };
  const handleRestore = (aid, item) => {
    setId(aid);
    dispatch(setIsConfirm(true));
    setIsActive(true);
    setData(item);
  };

  return [
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    id,
    data,
    isActive,
  ];
};
export default useTableActions;
