import React from "react";

import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

import showChatList from "../../utils/showChatList";
import useMediaQuery from "../../Hooks/useMediaQuery";

import UserList from "../UserLIst/UserList";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import DeleteChat from "../DeleteChat/DeleteChat";

import addicon from "../../icons/add.svg";
import placeholder from "../../icons/avatar.png";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { currentUser, userSignout } = useAuth();
  const { selectedChat, showUserList, deleteChat, dispatch } = useChat();
  const viewChatList = showChatList(isMobile, selectedChat, showUserList);

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

  function logout() {
    userSignout();
  }

  return (
    <div className={DashboardStyles.container}>
      {console.log(viewChatList)}
      <div className={DashboardStyles.content}>
        {viewChatList && (
          <div className={DashboardStyles.chatlist}>
            <div className={DashboardStyles.header}>
              <div className={DashboardStyles.userimage}>
                <img
                  src={currentUser.photoURL ?? placeholder}
                  alt={currentUser.displayName}
                />
              </div>
              <div className={DashboardStyles.select}>
                <p>Messages</p>
                <img
                  onClick={() => toggleUserList()}
                  src={addicon}
                  alt="new chat"
                />
              </div>
            </div>

            <div className={DashboardStyles.list}>
              <ChatList />
            </div>
          </div>
        )}
        {selectedChat && (
          <div>
            <ChatView />
          </div>
        )}
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
      {deleteChat && (
        <>
          <div className={DashboardStyles.modalcontainer}></div>
          <DeleteChat />
        </>
      )}
    </div>
  );
}
