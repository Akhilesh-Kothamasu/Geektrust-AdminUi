import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header.js";
import Search from "../Search/Search.js";
import TableRow from "../TableRow/TableRow.js";
import DeleteSelected from "../DeleteSelected/DeleteSelected.js";
import Pagination from "../Pagination/Pagination.js";
import "./Report.css";

const Report = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [presentPage, setPresentPage] = useState(1);
  const [selectCheckbox, setSelectCheckbox] = useState([]);
  const [selectAllUser, setSelectAllUser] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setFetching(true);
      const data = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUser(data.data);
      setFetching(false);
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  const itemsPerPage = 10;
  const startIndex = (presentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = user.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPresentPage(newPage);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    debounceSearch(searchTerm, 500);
  };

  let debounceTimerId = null;

  const debounceSearch = (searchTerm, debounceTimeout) => {
    setFetching(true);

    if (debounceTimerId) {
      clearTimeout(debounceTimerId);
    }

    debounceTimerId = setTimeout(async () => {
      try {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (searchTerm === "") {
          await fetchUsers();
        } else {
          const searchResult = user.filter((item) => {
            const itemName = item.name.toLowerCase();
            const itemEmail = item.email.toLowerCase();
            const itemRole = item.role.toLowerCase();
            return (
              itemName.includes(lowerCaseSearchTerm) ||
              itemEmail.includes(lowerCaseSearchTerm) ||
              itemRole.includes(lowerCaseSearchTerm)
            );
          });

          setUser(searchResult);
        }

        setFetching(false);
      } catch (error) {
        console.error("Error searching: ", error);
      }
    }, debounceTimeout);
  };

  const handleDeleteUser = async (userId) => {
    setFetching(true);
    setUser((prevUser) => {
      const updatedUser = prevUser.filter((user) => user.id !== userId);
      setFetching(false);
      return updatedUser;
    });
  };

  const handleSelectUser = (userId) => {
    setSelectCheckbox((prevSelectedUsers) => {
      const updatedSelectedUsers = new Set(prevSelectedUsers);

      if (updatedSelectedUsers.has(userId)) {
        updatedSelectedUsers.delete(userId);
      } else {
        updatedSelectedUsers.add(userId);
      }

      return Array.from(updatedSelectedUsers);
    });
  };

  const deleteMultiple = async () => {
    setFetching(true);
    setSelectAllUser(false);

    for (const userId of selectCheckbox) {
      await handleDeleteUser(userId);
    }
    setFetching(false);
  };

  const selectAll = () => {
    setFetching(true);
    if (selectCheckbox.length !== 10) {
      setSelectAllUser(true);
      setSelectCheckbox(displayedItems.map((user) => user.id));
    } else {
      setSelectAllUser(false);
      setSelectCheckbox([]);
    }
    setFetching(false);
  };

  return (
    <div>
      <Header />
      <Search searchQuery={handleSearchChange} />
      <table id="users">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllUser}
                onClick={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetching ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            displayedItems.map((val) => {
              return (
                <TableRow
                  user={val}
                  key={val.id}
                  checked={selectCheckbox.includes(val.id)}
                  selectUser={() => handleSelectUser(val.id)}
                  handleDelete={() => handleDeleteUser(val.id)}
                />
              );
            })
          )}
        </tbody>
      </table>
      <DeleteSelected handleDeleteSelected={deleteMultiple} />
      <div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={user.length}
          currentPage={presentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Report;
