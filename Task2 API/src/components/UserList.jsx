import React, { useState } from "react";
import UserItem from "./UserItem";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchTriggered, setIsFetchTriggered] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchClick = () => {
    setIsFetchTriggered(true);
    fetchUsers();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      {!isFetchTriggered && (
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to User Directory
          </h1>
          <p className="text-gray-600 mt-2">
            Click the button below to fetch a list of users
          </p>
        </div>
      )}

      {!isFetchTriggered && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            onClick={handleFetchClick}
          >
            Fetch Users
          </button>
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && users.length > 0 && (
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 mt-6">
          <h1 className="font-bold underline text-3xl">User List</h1>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
