import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, chats, firebase } from "../firebase";

import updatePresence from "../utils/updatePresence";

import Loading from "../components/Loading/Loading";

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

  function userSignout() {
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
        if (snapshot.val() === false) {
          return;
        }

        await chats.users
          .child(currentUser.uid)
          .onDisconnect()
          .update({ presence: "Offline", lastSeen: chats.timeStamp })
          .then(async () => {
            if (currentUser) {
              await chats.users
                .child(currentUser.uid)
                .update({ presence: "Online" });
            }
          });
      });
  });

  useEffect(() => {
    document.onvisibilitychange = async (e) => {
      if (!currentUser) {
        return;
      }
      if (document.visibilityState === "hidden") {
        const presence = "Away";
        updatePresence(presence, currentUser);
      } else {
        chats.users.child(currentUser.uid).update({ presence: "Online" });
      }
    };
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      {!loading && (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  );
}
