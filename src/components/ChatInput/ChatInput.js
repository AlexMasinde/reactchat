import React from "react";
import { useState } from "react/cjs/react.development";
import shortid from "shortid";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { chats } from "../../firebase";

import deleteicon from "../../icons/deleteicon.svg";
import sendicon from "../../icons/sendicon.svg";

import ChatInputStyles from "./ChatInput.module.css";

export default function ChatInput() {
  const { currentUser } = useAuth();
  const { selectedUser, conversations } = useChat();
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

  return (
    <div className={ChatInputStyles.container}>
      <img src={deleteicon} alt="delete" />
      <div className={ChatInputStyles.message}>
        <input
          onChange={handleMessage}
          value={message}
          type="text"
          placeholder="Type a message"
        />
        <img onClick={() => sendMessage()} src={sendicon} alt="send" />
      </div>
    </div>
  );
}
