import { auth, users } from "../firebase";

export default async function googleSignin(withGoogle) {
  await withGoogle();
  const currentUser = auth.currentUser;
  const user = await users.child(currentUser.uid).get();
  if (!user.exists()) {
    await users.child(currentUser.uid).set({
      username: currentUser.displayName,
      photo: currentUser.photoURL,
      email: currentUser.email,
      presence: "online",
    });
  }
}
