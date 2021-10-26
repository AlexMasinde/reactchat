import { createContext, useContext, useReducer } from "react";
import useConversations from "../hooks/useConversations";

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
    default: {
      return state;
    }
  }
}

const initialState = {
  chatList: [],
  conversations: [],
  selectedChat: {},
  selectedUser: {},
};

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const userConversations = useConversations();

  const value = {
    chatList: state.chatList,
    conversations: state.conversations,
    selectedChat: state.selectedChat,
    selectedUser: state.selectedUser,
    dispatch,
  };
  return (
    <ChatContext.Provider value={value}>
      {console.log(userConversations)}
      {children}
    </ChatContext.Provider>
  );
}
