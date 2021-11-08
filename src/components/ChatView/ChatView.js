import React, { useEffect } from "react";
import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";

import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";

import useChatMessages from "../../Hooks/useChatMessages";

import placeholder from "../../icons/avatar.png";
import noUser from "../../icons/nouser.svg";

import ChatViewStyles from "./ChatView.module.css";

export default function ChatView() {
  const { allUsers, selectedChat, dispatch } = useChat();
  const messages = useChatMessages(selectedChat);
  const otherUser = allUsers.filter(
    (user) => user.uid === selectedChat.conversationWith
  );

  const deletedUser = {
    uid: "deleted-user",
    username: "Deleted User",
    photo: noUser,
  };

  const chatUser = otherUser.length > 0 ? otherUser[0] : deletedUser;

  useEffect(() => {
    const element = document.getElementById("chatdisplay");
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
      });
    }
  });

  const lastSeen = new Date(chatUser?.lastSeen).toLocaleString("en-Uk");

  function closeChat() {
    dispatch({
      type: "SET_SELECTED_CHAT",
      payload: null,
    });
  }

  function status() {
    if (chatUser?.presence === "Online") {
      return `${ChatViewStyles.status} ${ChatViewStyles.online}`;
    } else if (chatUser?.presence === "Offline") {
      return `${ChatViewStyles.status} ${ChatViewStyles.offline}`;
    } else {
      return `${ChatViewStyles.status} ${ChatViewStyles.away}`;
    }
  }

  function text() {
    if (chatUser?.presence === "Online") {
      return "Online";
    } else if (chatUser?.presence === "Away") {
      return "Away";
    } else {
      return `Last Seen: ${lastSeen}`;
    }
  }

  const statusText = text();
  const statusClass = status();

  return (
    <div className={ChatViewStyles.container}>
      {console.log(lastSeen)}
      <div className={ChatViewStyles.header}>
        <div className={ChatViewStyles.userdetails}>
          <div className={ChatViewStyles.profilephoto}>
            <img
              src={chatUser?.photo ?? placeholder}
              alt={chatUser?.username}
            />
          </div>
          <div className={ChatViewStyles.name}>
            <p className={ChatViewStyles.username}>{chatUser?.username}</p>
            <p className={statusClass}>{statusText}</p>
          </div>
        </div>
      </div>
      <div id="chatdisplay" className={ChatViewStyles.chatdisplay}>
        {messages.map((message) => {
          return (
            <Message
              key={shortid()}
              message={message}
              chatUser={chatUser}
              allMessages={messages}
            />
          );
        })}
        <div className={ChatViewStyles.chatinput}>
          <ChatInput deletedUser={deletedUser} />
        </div>
      </div>
    </div>
  );
}
