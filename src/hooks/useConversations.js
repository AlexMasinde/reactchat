import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../contexts/AuthContext";
import { chats } from "../firebase";

export default function useConversations() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    const subscribe = chats.conversations
      .orderByChild(currentUser.uid)
      .equalTo(true)
      .on("child_changed", (dataSnapshot) => {
        setData((data) => [
          ...data,
          { ...dataSnapshot.val(), uid: dataSnapshot.key },
        ]);
      });

    return chats.conversations.off("child_changed", subscribe);
  }, [currentUser]);
  return data;
}
