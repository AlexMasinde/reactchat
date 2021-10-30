import React, { useState } from "react";
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
  const { selectedChat, showUserList, dispatch } = useChat();

  function toggleUserList() {
    dispatch({
      type: "SHOW_USER_LIST",
      payload: !showUserList,
    });
  }

  return (
    <div>
      <User />
      <div className={DashboardStyles.select}>
        <p>Messages</p>
        <img onClick={() => toggleUserList()} src={addicon} alt="new chat" />
      </div>
      {showUserList && (
        <>
          <div
            onClick={() => toggleUserList()}
            className={DashboardStyles.userlistcontainer}
          ></div>
          <UserList />
        </>
      )}
      <ChatList />
      {selectedChat && <ChatView />}
    </div>
  );
}
