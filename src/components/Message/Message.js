import React from "react";
import { useAuth } from "../../contexts/AuthContext";

import placeholder from "../../icons/avatar.png";
import showProfilePicture from "../../utils/showProfilePicture";

import MessageStyles from "./Message.module.css";
export default function Message({ message, chatUser, allMessages }) {
  const { currentUser } = useAuth();
  const showMessagePicture = showProfilePicture(message, allMessages);

  const imageSource =
    message.sender === currentUser.uid
      ? currentUser.photoURL ?? placeholder
      : chatUser.photo ?? placeholder;

  return (
    <div className={MessageStyles.container}>
      <div className={MessageStyles.profilephoto}>
        {showMessagePicture && (
          <img src={imageSource} alt={chatUser.username} />
        )}
      </div>
      <div className={MessageStyles.message}>
        <p>This is a test message</p>
      </div>
    </div>
  );
}
