import React from "react";
import "./DeleteSelected.css";

const DeleteSelected = ({ handleDeleteSelected }) => {
  return (
    <button className="deleteselected" onClick={handleDeleteSelected}>
      Delete Selected
    </button>
  );
};

export default DeleteSelected;
