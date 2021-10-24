import React from "react";

import placeholder from "../../icons/avatar.png";

import UserListItemStyles from "./UserListItem.module.css";

export default function UserListItem({ user }) {
  const { username, photo, presence } = user;
  return (
    <div className={UserListItemStyles.container}>
      <div className={UserListItemStyles.image}>
        <img src={photo ?? placeholder} alt={username} />
      </div>
      <div className={UserListItemStyles.details}>
        <p className={UserListItemStyles.username}>{username}</p>
        <p className={UserListItemStyles.presence}>{presence}</p>
      </div>
    </div>
  );
}
