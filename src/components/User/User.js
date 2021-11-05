import React from "react";

import { useAuth } from "../../contexts/AuthContext";

import placeholder from "../../icons/avatar.png";
import UserStyles from "./User.module.css";

export default function User() {
  const { currentUser } = useAuth();
  return (
    <div className={UserStyles.container}>
      <div className={UserStyles.image}>
        <img
          src={currentUser.photoURL ?? placeholder}
          alt={currentUser.displayName}
        />
      </div>
    </div>
  );
}
