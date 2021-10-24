import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { users } from "../../firebase";
import shortid from "shortid";

import UserListItem from "../UserListItem/UserListItem";
import SearchBar from "../SearchBar/SearchBar";

import UserListStyles from "./UserList.module.css";
import { useAuth } from "../../contexts/AuthContext";

export default function UserList() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const allusers = [];
        const data = await users.get();
        data.forEach((user) => {
          if (user.val().email !== currentUser.email) {
            allusers.push(user.val());
          }
        });
        setCurrentUsers(allusers);
      } catch (err) {
        setError(err.message);
        console.log(err);
        setLoading(false);
      }
    }
    getUsers();
    console.log("hoook ran");
  }, [currentUser]);

  return (
    <div className={UserListStyles.container}>
      <SearchBar text="Search Users" />

      {currentUsers.map((user) => {
        return <UserListItem user={user} key={shortid()} />;
      })}
    </div>
  );
}
