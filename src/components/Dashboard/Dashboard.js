import React from "react";

import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, userSignout } = useAuth();

  function handleSignOut() {
    userSignout();
  }

  return (
    <div>
      {console.log(currentUser)}
      <p>Welcome {currentUser.email}</p>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
}
