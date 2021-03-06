import React, { useEffect } from "react";
import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";

import placeholder from "../../icons/avatar.png";
import noUser from "../../icons/nouser.svg";

import ChatViewStyles from "./ChatView.module.css";
import getLastSeen from "../../utils/getLastSeen";

export default function ChatView() {
  const { currentUser } = useAuth();
  const { messages, selectedUser, selectedChat, dispatch, allUsers } =
    useChat();

  const getUser = allUsers.filter(
    (user) => user.uid === selectedChat.conversationWith
  )[0];

  const deletedUser = {
    uid: "deleted-user",
    username: "Deleted User",
    photo: noUser,
    presence: "Offline",
  };

  const chatUser = getUser || deletedUser;

  useEffect(() => {
    const element = document.getElementById("chatdisplay");
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
      });
    }
  });

  const lastSeen = selectedUser ? getLastSeen(chatUser?.lastSeen) : "Unknown";

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
      return `Last Seen: ${lastSeen ?? "Unknown"}`;
    }
  }

  function closeChat() {
    if (selectedChat) {
      dispatch({
        type: "SET_SELECTED_CHAT",
        payload: null,
      });
    }
  }

  const statusText = text();
  const statusClass = status();

  return (
    <div className={ChatViewStyles.container}>
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
        <div onClick={closeChat} className={ChatViewStyles.close}>
          <p>Close</p>
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
              currentUser={currentUser}
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
