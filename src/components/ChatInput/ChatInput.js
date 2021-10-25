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
  const { selectedUser, conversations, dispatch } = useChat();
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
    const users = [currentUser.uid, selectedUser.uid];
    const chatTitle = users.join(":");
    const chatExists = conversations.filter(
      (conversation) => conversation.uid === chatTitle
    );
    try {
      if (chatExists.length < 1) {
        const newConversation = {
          uid: chatTitle,
          startedAt: chats.timeStamp,
          with: selectedUser.uid,
        };
        await chats.users
          .child(`${currentUser.uid}/conversations`)
          .child(chatTitle)
          .set(newConversation);

        dispatch({
          type: "SET_CONVERSATIONS",
          payload: [newConversation, ...conversations],
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
        .child(shortid())
        .set(newMesage);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSend() {
    try {
      setLoading(true);
      setError();

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
