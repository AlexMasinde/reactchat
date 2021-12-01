import { chats } from "../firebase";

export default function updatePresence(presence, currentUser) {
  chats.users.child(currentUser.uid).update({
    presence: presence,
    lastSeen: chats.timeStamp,
  });
}
