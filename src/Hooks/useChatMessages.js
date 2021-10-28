import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { chats } from "../firebase";

export default function useChatMessages(selectedChat) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([]);
    const ref = chats.conversations.child(selectedChat.uid).child("messages");
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
