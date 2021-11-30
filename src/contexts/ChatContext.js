import { createContext, useContext, useReducer, useEffect } from "react";
import { chats } from "../firebase";
import { useAuth } from "./AuthContext";

export const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chatList: action.payload };
    case "SET_SELECTED_CHAT":
      return { ...state, selectedChat: action.payload };
    case "SET_CONVERSATIONS":
      return { ...state, conversations: action.payload };
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SET_USERS":
      return { ...state, allUsers: action.payload };
    case "SHOW_USER_LIST":
      return { ...state, showUserList: action.payload };
    case "DELETE_CHAT":
      return { ...state, deleteChat: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    default: {
      return state;
    }
  }
}

const initialState = {
  allUsers: [],
  chatList: [],
  conversations: [],
  selectedChat: null,
  selectedUser: {},
  messages: [],
  showUserList: false,
  deleteChat: false,
};

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { selectedChat } = state;
  const { currentUser } = useAuth();

  //fetches all messages for a particular chat, only runs when a user selects a different chat
  useEffect(() => {
    let allMessages = [];
    dispatch({
      type: "SET_MESSAGES",
      payload: [],
    });
    if (!selectedChat || !selectedChat.conversationStartedAt) {
      return;
    }
    const ref = chats.conversations
      .child(selectedChat.uid)
      .child("messages")
      .orderByChild("sentAt")
      .startAt(selectedChat.conversationStartedAt);
    const subscribe = ref.on("child_added", (dataSnapshot) => {
      const message = dataSnapshot.val();
      const uid = dataSnapshot.key;
      allMessages = [...allMessages, { ...message, uid }];
      dispatch({
        type: "SET_MESSAGES",
        payload: allMessages,
      });
    });
    return () => ref.off("child_added", subscribe);
  }, [selectedChat]);

  //gets all the users in the application
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    //fetch all users remove from current user

    const subscribe = chats.users.on("value", (dataSnapshot) => {
      const promises = [];
      let allUsers = [];
      dataSnapshot.forEach((snapshot) => {
        promises.push({ ...snapshot.val(), uid: snapshot.key });
      });

      Promise.all(promises)
        .then((users) => {
          users.forEach((user) => {
            allUsers.push(user);
          });
        })
        .finally(() => {
          allUsers = allUsers.filter((user) => user.uid !== currentUser.uid);
          dispatch({
            type: "SET_USERS",
            payload: allUsers,
          });
        });
    });

    return () => chats.users.off("value", subscribe);
  }, [currentUser]);

  //gets all the conversations that the current user is engaged in
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const subscribe = chats.users
      .child(currentUser.uid)
      .child("conversations")
      .on("value", (dataSnapshot) => {
        const promises = [];
        let allConversations = [];
        dataSnapshot.forEach((snapshot) => {
          promises.push({ ...snapshot.val(), uid: snapshot.key });
        });

        Promise.all(promises)
          .then((conversations) => {
            conversations.forEach((conversation) => {
              allConversations.push(conversation);
            });
          })
          .finally(() => {
            dispatch({
              type: "SET_CONVERSATIONS",
              payload: allConversations,
            });
          });
      });

    return () =>
      chats.users
        .child(currentUser.uid)
        .child("conversations")
        .off("value", subscribe);
  }, [currentUser]);

  const value = {
    ...state,
    dispatch,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
