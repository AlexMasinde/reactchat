import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../contexts/AuthContext";
import { chats } from "../firebase";

export default function useConversations() {
  const { currentUser } = useAuth();
  const [userConversations, setUserConversations] = useState();
  useEffect(() => {
    async function getData() {
      const data = await chats.conversations.get();
      const allConversations = [];
      data.forEach((conversation) => {
        allConversations.push({ ...conversation.val(), uid: conversation.key });
      });
      setUserConversations(allConversations);
    }
    getData();
  }, [currentUser]);
  return userConversations;
}
