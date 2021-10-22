import React from "react";

import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, userSignout } = useAuth();

  function handleSignOut() {
    userSignout();
  }

  return (
    <div>
      <p>Welcome {currentUser.email}</p>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
}
