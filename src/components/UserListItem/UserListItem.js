import React from "react";
import { useChat } from "../../contexts/ChatContext";

import placeholder from "../../icons/avatar.png";

import UserListItemStyles from "./UserListItem.module.css";

export default function UserListItem({ user }) {
  const { username, photo, presence } = user;
  const { dispatch } = useChat();

  function selectUser() {
    dispatch({
      type: "SET_SELECTED_USER",
      payload: user,
    });
  }
  return (
    <div onClick={() => selectUser()} className={UserListItemStyles.container}>
      <div className={UserListItemStyles.image}>
        <img
          src={photo ?? placeholder}
          alt={username}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={UserListItemStyles.details}>
        <p className={UserListItemStyles.username}>{username}</p>
        <p className={UserListItemStyles.presence}>{presence}</p>
      </div>
    </div>
  );
}
