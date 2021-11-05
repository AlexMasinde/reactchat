import { chats } from "../firebase";

export default async function updatePresence(presence, currentUser) {
  try {
    await chats.users.child(currentUser.uid).update({
      presence: presence,
      lastSeen: chats.timeStamp,
    });
  } catch (err) {
    console.log(err);
  }
}
