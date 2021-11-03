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

  const isSender = message.sender === currentUser.uid;

  const messageClasses = isSender
    ? `${MessageStyles.sender} ${MessageStyles.message}`
    : `${MessageStyles.receiver} ${MessageStyles.message}`;

  const containerClasses = isSender
    ? `${MessageStyles.container} ${MessageStyles.reversedcontainer}`
    : `${MessageStyles.container}`;

  return (
    <div className={containerClasses}>
      <div className={MessageStyles.profilephoto}>
        {showMessagePicture && (
          <img src={imageSource} alt={chatUser.username} />
        )}
      </div>
      <div className={messageClasses}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
