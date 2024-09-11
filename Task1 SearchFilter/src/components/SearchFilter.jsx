import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";

const SearchFilterComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample list of items
  const items = [
    "React",
    "JavaScript",
    "Next.js",
    "Node.js",
    "TailwindCSS",
    "API Integration",
    "Frontend",
    "Backend",
  ];

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Search Filter
        </h1>

        {/* SearchBar Component */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* ItemList Component */}
        <ItemList filteredItems={filteredItems} />
      </div>
    </div>
  );
};

export default SearchFilterComponent;
