import React from "react";

const UserItem = ({ user }) => {
  return <li className="py-2 px-4 hover:bg-blue-50">{user.name}</li>;
};

export default UserItem;
