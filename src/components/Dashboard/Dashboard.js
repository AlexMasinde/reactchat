import React from "react";
import { useAuth } from "../../contexts/AuthContext";

import UserList from "../UserLIst/UserList";

export default function Dashboard() {
  const { currentUser, userSignout } = useAuth();
  async function handleSignout() {
    await userSignout();
  }
  return (
    <div>
      <UserList />
      <img src={currentUser.photoURL} alt="The user profile" />
      <p>{currentUser.displayName}</p>
      <p onClick={() => handleSignout()}>Logout</p>
    </div>
  );
}
