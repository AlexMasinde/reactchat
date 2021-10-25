import { auth, chats } from "../firebase";

export default async function googleSignin(withGoogle) {
  await withGoogle();
  const currentUser = auth.currentUser;
  const user = await chats.users.child(currentUser.uid).get();
  if (!user.exists()) {
    await chats.users.child(currentUser.uid).set({
      username: currentUser.displayName,
      photo: currentUser.photoURL,
      email: currentUser.email,
      presence: "online",
    });
  }
}
