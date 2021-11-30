import React, { useState } from "react";
import { captureException } from "@sentry/browser";

import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { chats } from "../../firebase";

import markAsRead from "../../utils/markAsRead";

import deleteicon from "../../icons/deleteicon.svg";
import sendicon from "../../icons/sendicon.svg";

import ChatInputStyles from "./ChatInput.module.css";

export default function ChatInput({ deletedUser }) {
  const { currentUser } = useAuth();
  const { selectedUser, conversations, selectedChat, dispatch, deleteChat } =
    useChat();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deleted = deletedUser.uid === currentUser.uid;

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  async function sendMessage() {
    if (loading || message.trim() === "") {
      console.log("loading or empty");
      return;
    }

    if (deleted) {
      console.log("deleted");
      return setError("You can't send messages to deleted users");
    }

    const sender = currentUser.uid;
    const receiver = selectedUser.uid;

    const users = [sender, receiver];
    const chatTitle = users.sort().join(":");
    const conversationExists = conversations.filter(
      (conversation) => conversation.uid === chatTitle
    );

    try {
      setError("");
      setLoading(true);
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

        const data = await chats.users
          .child(currentUser.uid)
          .child("conversations")
          .child(chatTitle)
          .get();
        const newConversation = { ...data.val(), uid: data.key };
        console.log(newConversation);
        dispatch({
          type: "SET_SELECTED_CHAT",
          payload: newConversation,
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
      setMessage("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Could not send! Try again");
      captureException(err);
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

  function handleDelete() {
    dispatch({
      type: "DELETE_CHAT",
      payload: !deleteChat,
    });
  }

  return (
    <>
      <div className={ChatInputStyles.container}>
        <img onClick={() => handleDelete()} src={deleteicon} alt="delete" />
        <div className={ChatInputStyles.message}>
          <input
            onChange={handleMessage}
            onFocus={handleFocus}
            onKeyUp={handleKeyUp}
            value={message}
            type="text"
          />
          <img onClick={() => sendMessage()} src={sendicon} alt="send" />
        </div>
      </div>
      {error && <p className={ChatInputStyles.error}>{error}</p>}
    </>
  );
}
