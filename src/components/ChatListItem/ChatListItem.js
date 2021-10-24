import React from "react";

import ChatListItemStyles from "./ChatList.module.csss";

export default function ChatListItem() {
  return (
    <div className={ChatListItemStyles.container}>
      <div className={ChatListItemStyles.image}>
        <img src={placeholder} alt="profile" />
      </div>
      <div className={ChatListItemStyles.details}>
        <p className={ChatListItemStyles.name}>John Doe</p>
        <p className={ChatListItemStyles.message}>This is test message</p>
        <p className={ChatListItemStyles.presence}>Online</p>
      </div>
    </div>
  );
}
