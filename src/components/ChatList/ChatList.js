import React from "react";
import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";

import useMediaQuery from "../../Hooks/useMediaQuery";

import add from "../../icons/add.svg";

import ChatListItem from "../ChatListItem/ChatListItem";
import Loading from "../Loading/Loading";

import ChatListStyles from "./ChatList.module.css";

export default function ChatList() {
  const { conversations, showUserList, loadingConversations } = useChat();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const displayList = [...conversations].reverse();

  const chatsAvailable = conversations.length > 0;
  const renderNewChatMessage =
    !loadingConversations && !showUserList && !chatsAvailable && isMobile;

  return (
    <div className={ChatListStyles.container}>
      {!loadingConversations &&
        displayList.map((conversation) => {
          return <ChatListItem key={shortid()} conversation={conversation} />;
        })}
      {loadingConversations && (
        <div className={ChatListStyles.loading}>
          <Loading />
        </div>
      )}
      {renderNewChatMessage && (
        <div className={ChatListStyles.nochats}>
          <p>
            No chats available. Click <img src={add} alt="new chat" />
            &nbsp;above to start a new chat
          </p>
        </div>
      )}
    </div>
  );
}
