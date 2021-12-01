import React from "react";

import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

import showChatList from "../../utils/showChatList";
import useMediaQuery from "../../Hooks/useMediaQuery";

import UserList from "../UserLIst/UserList";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import DeleteChat from "../DeleteChat/DeleteChat";

import add from "../../icons/add.svg";
import placeholder from "../../icons/avatar.png";

import DashboardStyles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { currentUser } = useAuth();
  const {
    selectedChat,
    showUserList,
    deleteChat,
    dispatch,
    conversations,
    loadingConversations,
  } = useChat();
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

  return (
    <div className={DashboardStyles.container}>
      <div className={DashboardStyles.content}>
        {viewChatList && (
          <div className={DashboardStyles.chatlist}>
            <div className={DashboardStyles.header}>
              <div className={DashboardStyles.userimage}>
                <Link to={`/userprofile/:${currentUser.uid}`}>
                  <img
                    src={currentUser.photoURL ?? placeholder}
                    alt={currentUser.displayName}
                  />
                </Link>
              </div>
              <div
                onClick={() => toggleUserList()}
                className={DashboardStyles.select}
              >
                <p>New</p>
                <img src={add} alt="new chat" />
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
        {!selectedChat && !isMobile && (
          <div className={DashboardStyles.nochat}>
            {conversations.length > 0 && (
              <p>No chat Selected! You can select one on the left</p>
            )}
            {!loadingConversations && conversations.length === 0 && (
              <div className={DashboardStyles.newchat}>
                <p>
                  No chats available. Click <img src={add} alt="new chat" />
                  &nbsp;above to start a new chat
                </p>
              </div>
            )}
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
