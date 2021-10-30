import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";

import placeholder from "../../icons/avatar.png";

import UserListItemStyles from "./UserListItem.module.css";

export default function UserListItem({ user }) {
  const { username, photo, presence } = user;
  const { dispatch, showUserList } = useChat();
  const { currentUser } = useAuth();

  function selectUser() {
    const users = [user.uid, currentUser.uid];
    const chatUid = users.sort().join(":");

    const newChat = {
      uid: chatUid,
      conversationWith: user.uid,
      lastMessage: {
        sender: currentUser.uid,
        text: "New chat",
      },
    };

    dispatch({
      type: "SET_SELECTED_USER",
      payload: user,
    });

    dispatch({
      type: "SET_SELECTED_CHAT",
      payload: newChat,
    });

    dispatch({
      type: "SHOW_USER_LIST",
      payload: !showUserList,
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
