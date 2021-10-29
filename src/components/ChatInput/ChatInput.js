import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { chats } from "../../firebase";

import markAsRead from "../../utils/markAsRead";

import deleteicon from "../../icons/deleteicon.svg";
import sendicon from "../../icons/sendicon.svg";

import ChatInputStyles from "./ChatInput.module.css";

export default function ChatInput() {
  const { currentUser } = useAuth();
  const { selectedUser, conversations, selectedChat } = useChat();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  async function sendMessage() {
    if (!selectedUser) {
      return;
    }

    const sender = currentUser.uid;
    const receiver = selectedUser.uid;

    const users = [sender, receiver];
    const chatTitle = users.sort().join(":");
    const conversationExists = conversations.filter(
      (conversation) => conversation.uid === chatTitle
    );

    try {
      const newMesage = {
        text: message,
        sender: currentUser.uid,
        sentAt: chats.timeStamp,
        read: false,
      };

      await chats.conversations
        .child(chatTitle)
        .child("messages")
        .child(Math.floor(Date.now() + Math.random()))
        .set(newMesage);

      const chatExists = await chats.users
        .child(receiver)
        .child(`conversations/${chatTitle}`)
        .get();

      if (conversationExists.length < 1) {
        await chats.users
          .child(sender)
          .child(`conversations/${chatTitle}`)
          .set({
            conversationStartedAt: chats.timeStamp,
            conversationWith: receiver,
            lastMessage: {
              message: message,
              sentAt: chats.timeStamp,
              read: false,
              sender: sender,
            },
          });
      } else {
        await chats.users
          .child(sender)
          .child(`conversations/${chatTitle}`)
          .child("lastMessage")
          .update({
            message: message,
            sentAt: chats.timeStamp,
            read: false,
            sender: sender,
          });
      }

      if (!chatExists.exists()) {
        await chats.users
          .child(receiver)
          .child(`conversations/${chatTitle}`)
          .set({
            conversationStartedAt: chats.timeStamp,
            lastMessage: {
              message: message,
              sentAt: chats.timeStamp,
              read: false,
              sender: sender,
            },
            conversationWith: sender,
          });
      } else {
        await chats.users
          .child(receiver)
          .child(`conversations/${chatTitle}`)
          .child("lastMessage")
          .update({
            message: message,
            sentAt: chats.timeStamp,
            read: false,
            sender: sender,
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSend() {
    try {
      setLoading(true);
      setError();
      await sendMessage();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function handleFocus() {
    await markAsRead(selectedChat, currentUser);
  }

  async function handleKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      await sendMessage();
    }
  }

  return (
    <div className={ChatInputStyles.container}>
      <img src={deleteicon} alt="delete" />
      <div className={ChatInputStyles.message}>
        <input
          onChange={handleMessage}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          value={message}
          type="text"
          placeholder="Type a message"
        />
        <img onClick={() => sendMessage()} src={sendicon} alt="send" />
      </div>
    </div>
  );
}
