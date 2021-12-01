export default function showChatList(isMobile, selectedChat, showUserList) {
  if (isMobile && showUserList) {
    return false;
  } else if (isMobile && selectedChat) {
    return false;
  } else {
    return true;
  }
}
