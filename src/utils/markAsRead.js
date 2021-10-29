import { chats } from "../firebase";
export default async function markAsRead(selectedChat, currentUser) {
  const { lastMessage } = selectedChat;
  if (!lastMessage.read && lastMessage.sender !== currentUser.uid) {
    await chats.users
      .child(currentUser.uid)
      .child("conversations")
      .child(selectedChat.uid)
      .child("lastMessage")
      .update({
        read: true,
      });
  }
}
