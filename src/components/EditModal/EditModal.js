import React from "react";
import "./EditModal.css";

const EditModal = ({
  openModal,
  handleClose,
  userData,
  handleChange,
  handleUpdate
}) => {
  return (
    <div>
      {openModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <h2>Edit User</h2>
            <div className="editUser">
              <label htmlFor="username">Name :</label>
              <input
                id="username"
                name="username"
                placeholder="Enter name"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="editEmail">
              <label htmlFor="useremail">Email :</label>
              <input
                id="useremail"
                name="useremail"
                placeholder="Enter email"
                value={userData.useremail}
                onChange={handleChange}
              />
            </div>
            <div className="editRole">
              <label htmlFor="userrole">Role :</label>
              <input
                id="userrole"
                name="userrole"
                placeholder="Enter role"
                value={userData.userrole}
                onChange={handleChange}
              />
            </div>
            <div className="updateButton" onClick={handleUpdate}>
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
