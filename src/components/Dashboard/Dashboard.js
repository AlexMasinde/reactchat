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
    </div>
  );
}
