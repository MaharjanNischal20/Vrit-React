import React from "react";

const ItemList = ({ filteredItems }) => {
  return filteredItems.length > 0 ? (
    <ul className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      {filteredItems.map((item, index) => (
        <li key={index} className="py-2 px-4 hover:bg-blue-50 text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-center mt-4">No items found</p>
  );
};

export default ItemList;
