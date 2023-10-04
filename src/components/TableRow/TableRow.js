import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditModal from "../EditModal/EditModal.js";
import "./TableRow.css";

const TableRow = ({ user, handleDelete, selectUser, checked }) => {
  const [userData, setUserData] = useState({
    username: user.name,
    useremail: user.email,
    userrole: user.role
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleUpdate = () => {
    handleClose();
  };

  return (
    <tr key={user.id}>
      <td>
        <input type="checkbox" checked={checked} onClick={selectUser} />
      </td>
      <td>{userData.username}</td>
      <td>{userData.useremail}</td>
      <td>{userData.userrole}</td>
      <td>
        <EditOutlinedIcon fontSize={"small"} onClick={handleOpen} />
        <DeleteOutlinedIcon sx={{ fontSize: 20 }} onClick={handleDelete} />
      </td>
      <EditModal
        openModal={openModal}
        handleClose={handleClose}
        userData={userData}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
    </tr>
  );
};

export default TableRow;
