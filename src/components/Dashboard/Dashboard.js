import React from "react";

import { useChat } from "../../contexts/ChatContext";

import User from "../User/User";
import UserList from "../UserLIst/UserList";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import DeleteChat from "../DeleteChat/DeleteChat";

import addicon from "../../icons/add.png";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const { selectedChat, showUserList, deleteChat, dispatch } = useChat();

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
            className={DashboardStyles.modalcontainer}
          ></div>
          <UserList />
        </>
      )}
      <ChatList />
      {selectedChat && <ChatView />}
      {deleteChat && (
        <>
          <div className={DashboardStyles.modalcontainer}></div>
          <DeleteChat />
        </>
      )}
    </div>
  );
}
