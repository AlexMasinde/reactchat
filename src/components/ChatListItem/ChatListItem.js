import React from "react";

import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

import markAsRead from "../../utils/markAsRead";

import { findDifference } from "../../utils/findDifference";

import placeholder from "../../icons/avatar.png";

import ChatListItemStyles from "./ChatListItem.module.css";

export default function ChatListItem({ conversation }) {
  const { currentUser } = useAuth();
  const { allUsers, dispatch, selectedChat } = useChat();
  const { lastMessage, conversationWith } = conversation;
  const { sentAt, message } = lastMessage;

  const filterUsers = allUsers.filter((user) => user.uid === conversationWith);
  const user = filterUsers[0] || null;

  const timeSent = findDifference(sentAt);

  async function selectChat() {
    if (!selectedChat || selectedChat.uid !== conversation.uid) {
      dispatch({
        type: "SET_SELECTED_CHAT",
        payload: conversation,
      });
      dispatch({
        type: "SET_SELECTED_USER",
        payload: user,
      });
    }

    await markAsRead(conversation, currentUser);
  }

  function status() {
    if (user?.presence === "Online") {
      return `${ChatListItemStyles.username} ${ChatListItemStyles.online}`;
    } else if (user?.presence === "Offline") {
      return `${ChatListItemStyles.username} ${ChatListItemStyles.offline}`;
    } else {
      return `${ChatListItemStyles.username} ${ChatListItemStyles.away}`;
    }
  }

  const usernameClass = status();

  const readConversation =
    !lastMessage.read && lastMessage.sender !== currentUser.uid;

  const messageClasses = readConversation
    ? `${ChatListItemStyles.message} ${ChatListItemStyles.unread}`
    : `${ChatListItemStyles.message}`;

  const selected = selectedChat && conversation.uid === selectedChat.uid;

  const containerClasses = selected
    ? `${ChatListItemStyles.container} ${ChatListItemStyles.selected}`
    : `${ChatListItemStyles.container}`;

  return (
    <div onClick={() => selectChat()} className={containerClasses}>
      <div className={ChatListItemStyles.wrapper}>
        <div className={ChatListItemStyles.image}>
          <img
            src={user?.photo ?? placeholder}
            alt="profile"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className={ChatListItemStyles.details}>
          <div className={ChatListItemStyles.user}>
            <p className={usernameClass}>{user?.username}</p>
          </div>
          <p className={messageClasses}>{message}</p>
        </div>
      </div>
      <div className={ChatListItemStyles.timeleft}>
        <p>{timeSent}</p>
      </div>
    </div>
  );
}
