export default function showChatList(isMobile, selectedChat, showUserList) {
  if (isMobile && showUserList) {
    return false;
  } else if (isMobile === true && selectedChat) {
    return false;
  } else {
    return true;
  }
}
