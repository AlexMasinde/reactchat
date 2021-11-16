import React from "react";
import { render } from "@testing-library/react";
import { ChatContextProvider } from "./contexts/ChatContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const customRender = (ui, { providerProps }) => {
  render(
    <AuthContextProvider>
      <ChatContextProvider {...providerProps}>{ui}</ChatContextProvider>
    </AuthContextProvider>
  );
};

export * from "@testing-library/react";

export { customRender as render };
