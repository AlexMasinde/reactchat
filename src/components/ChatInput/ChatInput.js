import React from "react";

import deleteicon from "../../icons/deleteicon.svg";
import sendicon from "../../icons/sendicon.svg";

import ChatInputStyles from "./ChatInput.module.css";

export default function ChatInput() {
  return (
    <div className={ChatInputStyles.container}>
      <img src={deleteicon} alt="delete" />
      <div className={ChatInputStyles.message}>
        <input type="text" placeholder="Type a message" />
        <img src={sendicon} alt="send" />
      </div>
    </div>
  );
}
