import { createContext, useContext, useReducer } from "react";

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
  }
}

const initialState = {
  chatList: [],
  conversations: [],
  selectedChat: {},
};

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const value = {
    chatList: state.chatList,
    conversations: state.conversations,
    selectedChat: state.selectedChat,
    dispatch,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
