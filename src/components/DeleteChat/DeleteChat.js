import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";

import { chats } from "../../firebase";

import DeleteChatStyles from "./DeleteChat.module.css";

export default function DeleteChat() {
  const { selectedUser, selectedChat, dispatch } = useChat();
  const { currentUser } = useAuth();
  const { username } = selectedUser;
  const name = username.split(" ")[0];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  function toggleModal() {
    dispatch({
      type: "DELETE_CHAT",
      payload: false,
    });
  }

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      await chats.users
        .child(currentUser.uid)
        .child("conversations")
        .child(selectedChat.uid)
        .set(null);

      dispatch({
        type: "SET_SELECTED_CHAT",
        payload: null,
      });

      setLoading(false);
      toggleModal();
    } catch (err) {
      console.log(err);
      setError("Could not Delete");
    }
  }

  const loadingClass = loading ? `${DeleteChatStyles.loading}` : "";

  return (
    <div className={DeleteChatStyles.container}>
      <div className={DeleteChatStyles.header}>
        <p>Delete</p>
        <p onClick={() => toggleModal()}>Close</p>
      </div>
      <div className={DeleteChatStyles.message}>
        <p>{`Delete chat with ${name}?`}</p>
      </div>
      <button
        onClick={() => handleDelete()}
        disabled={loading}
        className={loadingClass}
      >
        Confirm
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
