import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, chats, firebase } from "../firebase";
import updatePresence from "../utils/updatePresence";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function userSignup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function withGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  function deleteAccount() {
    return auth.currentUser.delete();
  }

  async function userSignout() {
    const status = "Offline";
    await updatePresence(status, currentUser);
    return auth.signOut();
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firebase
      .database()
      .ref(".info/connected")
      .on("value", async (snapshot) => {
        if (snapshot.val() == false) {
          return;
        }

        await chats.users
          .child(currentUser.uid)
          .onDisconnect()
          .update({ presence: "Offline", lastSeen: chats.timeStamp })
          .then(async () => {
            await chats.users
              .child(currentUser.uid)
              .update({ presence: "Online" });
          });
      });
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    console.log("window visibility hook ran");

    const subscribe = (document.onvisibilitychange = async (e) => {
      if (document.visibilityState === "hidden") {
        const presence = "Away";
        await updatePresence(presence, currentUser);
      } else {
        const presence = "Online";
        await updatePresence(presence, currentUser);
      }
    });
    return () => subscribe;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const presence = "Online";
        await updatePresence(presence, user);
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    setCurrentUser,
    userSignup,
    userSignout,
    userLogin,
    withGoogle,
    deleteAccount,
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  );
}
