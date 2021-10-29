import React from "react";

import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

import markAsRead from "../../utils/markAsRead";

import { findDifference } from "../../utils/findDifference";

import placeholder from "../../icons/avatar.png";

import ChatListItemStyles from "./ChatListItem.module.css";

export default function ChatListItem({ conversation }) {
  const { currentUser } = useAuth();
  const { allUsers, dispatch } = useChat();
  const { lastMessage, conversationWith } = conversation;
  const user = allUsers.filter((user) => user.uid === conversationWith)[0];
  const { sentAt, message } = lastMessage;

  const timeSent = findDifference(sentAt);

  async function selectChat() {
    dispatch({
      type: "SET_SELECTED_CHAT",
      payload: conversation,
    });

    await markAsRead(conversation, currentUser);
  }

  const readConversation =
    !lastMessage.read && lastMessage.sender !== currentUser.uid;

  const messageClasses = readConversation
    ? `${ChatListItemStyles.message} ${ChatListItemStyles.unread}`
    : `${ChatListItemStyles.message}`;

  return (
    <div onClick={() => selectChat()} className={ChatListItemStyles.container}>
      <div className={ChatListItemStyles.image}>
        <img
          src={user?.photo ?? placeholder}
          alt="profile"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={ChatListItemStyles.details}>
        <div className={ChatListItemStyles.user}>
          <p className={ChatListItemStyles.username}>{user?.username}</p>
          <p>{timeSent}</p>
        </div>
        <p className={messageClasses}>{message}</p>
      </div>
    </div>
  );
}
