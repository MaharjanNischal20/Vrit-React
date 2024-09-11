import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
