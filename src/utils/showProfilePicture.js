export default function showProfilePicture(message, allMessages) {
  const messageIndex = allMessages.findIndex(
    (element) => message.uid === element.uid
  );
  const firstMessage =
    allMessages[messageIndex]?.sender !== allMessages[messageIndex - 1]?.sender;
  if (messageIndex === 0) {
    return true;
  } else {
    return firstMessage;
  }
}
