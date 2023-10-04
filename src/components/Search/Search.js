import React from "react";
import "./Search.css";

const Search = ({ searchQuery }) => {
  return (
    <input
      type="text"
      className="search"
      placeholder="Search by name, email or role..."
      onChange={(e) => searchQuery(e)}
    />
  );
};

export default Search;
