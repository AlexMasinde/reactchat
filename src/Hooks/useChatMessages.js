import { useState, useEffect } from "react";
import { chats } from "../firebase";

export default function useChatMessages(selectedChat) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!selectedChat.conversationStartedAt) {
      return;
    }
    setMessages([]);
    const ref = chats.conversations
      .child(selectedChat.uid)
      .child("messages")
      .orderByChild("sentAt")
      .startAt(selectedChat.conversationStartedAt);
    const subscribe = ref.on("child_added", (dataSnapshot) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...dataSnapshot.val(), uid: dataSnapshot.key },
      ]);
    });
    return () => ref.off("child_added", subscribe);
  }, [selectedChat]);

  return messages;
}
