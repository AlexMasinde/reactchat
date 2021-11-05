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
  testObject: null,
  showUserList: false,
  deleteChat: false,
};

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

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
          dispatch({
            type: "SET_USERS",
            payload: allUsers,
          });
        });
    });

    return () => chats.users.off("value", subscribe);
  }, [currentUser]);

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
    chatList: state.chatList,
    conversations: state.conversations,
    selectedChat: state.selectedChat,
    selectedUser: state.selectedUser,
    allUsers: state.allUsers,
    showUserList: state.showUserList,
    deleteChat: state.deleteChat,
    dispatch,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
