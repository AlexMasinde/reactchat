import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../Input/Input";

import passwordicon from "../../icons/passwordicon.svg";

import UserProfileStyles from "./UserProfile.module.css";
import Button from "../Button/Button";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const { currentUser, deleteAccount, userLogin } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { uid } = useParams();
  const profileId = uid.split(":")[1];

  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/reactchat-62a7d.appspot.com/o/chatplaceholder.png?alt=media&token=e434ebe1-ed25-4b61-99de-e7dd78e9e5e3";

  function handlePassword(e) {
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
    setPassword(e.target.value);
  }

  function triggerDelete() {
    setDeleting(!deleting);
    setErrors({});
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (password.trim() === "") {
      return setErrors({ ...errors, password: "Enter password to continue" });
    } else if (password.length < 6) {
      return setErrors({
        ...errors,
        password: "Should be six or more Characters",
      });
    }

    try {
      setLoading(true);
      await userLogin(currentUser.email, password);
      await deleteAccount();
      setLoading(false);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setErrors({ password: "Wrong Password" });
        setLoading(false);
      } else if (err.code === "auth/too-many-requests") {
        setErrors({ password: "Too many failed attempts" });
        setLoading(false);
      } else {
        setErrors({ password: "Could not Delete! Try again" });
        console.log(err);
        setLoading(false);
      }
    }
  }

  return (
    <div className={UserProfileStyles.container}>
      <div className={UserProfileStyles.photo}>
        <img
          src={currentUser.photoUrl ?? placeholderImage}
          alt={currentUser.displayName ?? currentUser.email}
        />
      </div>
      <div className={UserProfileStyles.details}>
        {currentUser.displayName && <p>{currentUser.displayName}</p>}
        <p>{currentUser.email}</p>
        {profileId === currentUser.uid && (
          <Button
            onClick={() => triggerDelete()}
            loading={loading}
            text={deleting ? "Undo" : "Delete Account"}
          />
        )}
      </div>
      {deleting && (
        <div className={UserProfileStyles.confirm}>
          <p>Enter password to confirm</p>
          <form onSubmit={handleDelete}>
            <Input
              type="password"
              icon={passwordicon}
              placeholder="Password"
              alt="Password"
              onChange={handlePassword}
            />
            <Button type="submit" loading={loading} text="Confirm" />
            {errors && errors.password && <p>{errors.password}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
