import React, { useEffect } from "react";

import { useChat } from "../../contexts/ChatContext";

import showChatList from "../../utils/showChatList";
import useMediaQuery from "../../Hooks/useMediaQuery";

import User from "../User/User";
import UserList from "../UserLIst/UserList";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import DeleteChat from "../DeleteChat/DeleteChat";

import addicon from "../../icons/add.png";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { selectedChat, showUserList, deleteChat, dispatch } = useChat();

  const viewChatList = isMobile && selectedChat;
  console.log(isMobile);

  function toggleUserList() {
    if (isMobile) {
      dispatch({
        type: "SET_SELECTED_CHAT",
        payload: null,
      });
    }
    dispatch({
      type: "SHOW_USER_LIST",
      payload: !showUserList,
    });
  }

  return (
    <div className={DashboardStyles.container}>
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
      {!viewChatList && <ChatList />}
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
