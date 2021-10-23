import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, firebase } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function userSignup(email, password) {
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
      {loading && <div className="latestArticles__loader"></div>}
      {!loading && (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  );
}
