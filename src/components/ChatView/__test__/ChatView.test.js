import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../../../contexts/AuthContext";
import { ChatContextProvider } from "../../../contexts/ChatContext";
import {
  allUsers,
  selectedChat,
  messages,
  currentUser,
} from "../../../utils/testValues";

import ChatView from "../ChatView";

jest.mock("../../../firebase", () => ({}));
jest.mock("../../../firebase", () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
}));

describe("Tests for ChatView component", () => {
  it("renders", () => {
    render(
      <AuthProvider currentUser={currentUser}>
        <ChatContextProvider testProps={(allUsers, selectedChat, messages)}>
          <ChatView />
        </ChatContextProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
