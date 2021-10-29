import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import User from "../User/User";

import UserList from "../UserLIst/UserList";

import addicon from "../../icons/add.png";

import DashboardStyles from "./Dashboard.module.css";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import { useChat } from "../../contexts/ChatContext";
import ChatInput from "../ChatInput/ChatInput";

export default function Dashboard() {
  const { currentUser, userSignout } = useAuth();
  const { selectedChat } = useChat();

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
      <ChatList />
      {selectedChat && <ChatView />}
      <ChatInput />
    </div>
  );
}
