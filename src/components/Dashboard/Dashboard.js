import React from "react";
import { Link } from "react-router-dom";

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
      <Link to={`/userprofile/:${currentUser.uid}`}>
        <p>View User profile</p>
      </Link>
      <p onClick={() => handleSignOut()}>Signout</p>
    </div>
  );
}
