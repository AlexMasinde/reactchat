import React from "react";
import shortid from "shortid";
import { useChat } from "../../contexts/ChatContext";
import ChatListItem from "../ChatListItem/ChatListItem";

import ChatListStyles from "./ChatList.module.css";

export default function ChatList() {
  const { conversations } = useChat();
  return (
    <div className={ChatListStyles.container}>
      {console.log(conversations)}
      {conversations.map((conversation) => {
        return <ChatListItem key={shortid()} conversation={conversation} />;
      })}
    </div>
  );
}
