import React from "react";

import ChatListItemStyles from "./ChatList.module.csss";

export default function ChatListItem({ user, message }) {
  return (
    <div className={ChatListItemStyles.container}>
      <div className={ChatListItemStyles.image}>
        <img src={user.photo} alt="profile" referrerPolicy="no-referrer" />
      </div>
      <div className={ChatListItemStyles.details}>
        <p className={ChatListItemStyles.name}>{user.username}</p>
        <p className={ChatListItemStyles.message}>{message}</p>
        <p className={ChatListItemStyles.presence}>{user.presence}</p>
      </div>
    </div>
  );
}
