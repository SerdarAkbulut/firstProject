import React, { useEffect, useState } from "react";
import UserComponent from "./components/UserComponent";
import DataTableComponent from "./components/DataTableComponent";

export default function Deneme() {
  const [users, setUsers] = useState([]);
  const api = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("API connection error");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [api]);

  const addUser = async (user) => {
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Error adding user");
      }
      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <UserComponent addUser={addUser} users={users} setUsers={setUsers} />
      {/* <DataTableComponent users={users}></DataTableComponent> */}
    </div>
  );
}
