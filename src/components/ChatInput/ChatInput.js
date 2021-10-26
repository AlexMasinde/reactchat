import React from "react";
import { useState } from "react/cjs/react.development";
import shortid from "shortid";
import { database, firebase } from "../../firebase";
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

    const sender = currentUser.uid;
    const receiver = selectedUser.uid;

    const users = [sender, receiver];
    const chatTitle = users.join(":");
    const chatExists = conversations.filter(
      (conversation) => conversation.uid === chatTitle
    );
    try {
      const newMesage = {
        text: message,
        sender: currentUser.uid,
        sentAt: new Date(),
        read: false,
      };

      if (chatExists.length < 1) {
        await database.conversations.doc(chatTitle).set({
          [receiver]: true,
          [sender]: true,
          messages: firebase.firestore.FieldValue.arrayUnion(newMesage),
        });
      }

      await database.conversations.doc(chatTitle).update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMesage),
      });
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
