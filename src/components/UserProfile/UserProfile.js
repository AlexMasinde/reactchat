import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../Input/Input";
import Button from "../Button/Button";

import passwordicon from "../../icons/passwordicon.svg";
import placeholder from "../../icons/avatar.png";

import UserProfileStyles from "./UserProfile.module.css";
import { auth, chats, firebase } from "../../firebase";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { uid } = useParams();
  const profileId = uid.split(":")[1];

  function handlePassword(e) {
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
    setPassword(e.target.value);
  }

  async function triggerDelete() {
    if (!deleting) {
      setLoading(true);
      const providers = await auth.fetchProvidersForEmail(currentUser.email);
      if (providers[0] === "google.com") {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          await auth.currentUser.reauthenticateWithPopup(provider);
          await chats.users.child(currentUser.uid).remove();
          await auth.currentUser.delete();
        } catch (err) {
          setLoading(false);
          switch (err.code) {
            case "auth/cancelled-popup-request":
              return setErrors({
                ...errors,
                googleAuth: "Request Already Sent",
              });
            case "auth/popup-blocked":
              return setErrors({
                ...errors,
                googleAuth: "Popup blocked by browser",
              });
            case "auth/popup-closed-by-user":
              return setErrors({
                ...errors,
                googleAuth: "Popup closed by user",
              });
            case "auth/user-mismatch":
              return setErrors({
                ...errors,
                googleAuth: "Wrong user selected",
              });
            default:
              return setErrors({
                ...errors,
                googleAuth: "Unknown Error! Try again",
              });
          }
        }
      } else {
        setDeleting(true);
      }
    } else {
      setDeleting(false);
    }
    setLoading(false);
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
      await auth.currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(currentUser.email, password)
      );
      await chats.users.child(currentUser.uid).remove();
      await auth.currentUser.delete();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/wrong-password":
          return setErrors({
            ...errors,
            password: "Wrong password",
          });
        case "auth/user-not-found":
          return setErrors({
            ...errors,
            password: "User not found",
          });
        default:
          return setErrors({
            ...errors,
            password: "Unknown Error! Try again",
          });
      }
    }
  }

  return (
    <div className={UserProfileStyles.container}>
      <div className={UserProfileStyles.photo}>
        <img
          src={currentUser.photoURL ?? placeholder}
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
          <p>Enter password to continue</p>
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
