import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import User from "../User/User";

import UserList from "../UserLIst/UserList";

import addicon from "../../icons/add.png";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const { currentUser, userSignout } = useAuth();
  async function handleSignout() {
    await userSignout();
  }
  return (
    <div>
      <User />
      <div className={DashboardStyles.select}>
        <p>Messages</p>
        <img src={addicon} alt="new chat" />
      </div>
      <UserList />
    </div>
  );
}
