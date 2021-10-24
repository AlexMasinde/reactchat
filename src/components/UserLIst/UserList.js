import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { users } from "../../firebase";
import shortid from "shortid";

import UserListItem from "../UserListItem/UserListItem";

import UserListStyles from "./UserList.module.css";

export default function UserList() {
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
          allusers.push(user.val());
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
  }, []);

  return (
    <div className={UserListStyles.container}>
      {currentUsers.map((user) => {
        return <UserListItem user={user} key={shortid()} />;
      })}
    </div>
  );
}
