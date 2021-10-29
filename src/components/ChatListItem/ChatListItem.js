import React from "react";
import { useChat } from "../../contexts/ChatContext";

import { findDifference } from "../../utils/findDifference";

import placeholder from "../../icons/avatar.png";

import ChatListItemStyles from "./ChatListItem.module.css";

export default function ChatListItem({ conversation }) {
  const { allUsers, dispatch } = useChat();
  const { lastMessage, conversationWith } = conversation;
  const user = allUsers.filter((user) => user.uid === conversationWith)[0];
  const { sentAt, message } = lastMessage;

  const timeSent = findDifference(sentAt);

  function selectChat() {
    dispatch({
      type: "SET_SELECTED_CHAT",
      payload: conversation,
    });
  }

  const readConversation = lastMessage.readConversation;

  const messageClasses = readConversation
    ? `${ChatListItemStyles.message} ${ChatListItemStyles.read}`
    : `${ChatListItemStyles.message} ${ChatListItemStyles.unread}`;

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
