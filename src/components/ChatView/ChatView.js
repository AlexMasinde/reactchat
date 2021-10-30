import React, { useEffect } from "react";
import shortid from "shortid";

import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";
import { useChat } from "../../contexts/ChatContext";

import useChatMessages from "../../Hooks/useChatMessages";
import placeholder from "../../icons/avatar.png";

import ChatViewStyles from "./ChatView.module.css";

export default function ChatView() {
  const { allUsers, selectedChat } = useChat();
  const messages = useChatMessages(selectedChat);
  const chatUser = allUsers.filter(
    (user) => user.uid === selectedChat.conversationWith
  )[0];

  useEffect(() => {
    const element = document.getElementById("chatdisplay");
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
      });
    }
  });

  return (
    <div className={ChatViewStyles.container}>
      <div className={ChatViewStyles.userdetails}>
        <div className={ChatViewStyles.profilephoto}>
          <img src={chatUser.photo ?? placeholder} alt={chatUser.username} />
        </div>
        <div className={ChatViewStyles.name}>
          <p className={ChatViewStyles.username}>{chatUser.username}</p>
          <p className={ChatViewStyles.status}>Online</p>
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
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
