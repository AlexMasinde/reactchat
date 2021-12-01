import React, { useState } from "react";
import { captureException } from "@sentry/react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { auth, storage, chats, realtimeDb } from "../../firebase";

import { validateSingup } from "../../utils/validate";
import googleProviderErrors from "../../utils/googleProviderErrors";

import emailicon from "../../icons/emailicon.svg";
import passwordicon from "../../icons/passwordicon.svg";
import usericon from "../../icons/usericon.svg";

import Input from "../Input/Input";
import Button from "../Button/Button";
import WithGoogle from "../WithGoogle/WithGoogle";

import SignupStyles from "./Signup.module.css";
import googleSignin from "../../utils/googleSignin";

export default function Singup() {
  const { userSignup, withGoogle, currentUser } = useAuth();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    file: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [displayFiileName, setDisplayFileName] = useState("Profile Photo");

  const authError = errors && errors.auth;

  function handleUsername(e) {
    const username = e.target.value;
    setUserDetails({ ...userDetails, username });
    if (errors) {
      errors.username = "";
    }
  }

  function handleEmail(e) {
    const email = e.target.value;
    setUserDetails({ ...userDetails, email });
    if (errors) {
      errors.email = "";
    }
  }

  function handlePassword(e) {
    const password = e.target.value;
    setUserDetails({ ...userDetails, password });
    if (errors) {
      errors.password = "";
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    const fileName = file.name;
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

    if (file && !allowedExtensions.includes(extension)) {
      setDisplayFileName("Upload images only");
    }

    if (file && allowedExtensions.includes(extension)) {
      setUserDetails({ ...userDetails, file });
      setDisplayFileName(file.name.substring(0, 22) + "...");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { username, email, password, file } = userDetails;
    const { errors, valid } = validateSingup(username, email, password);

    if (!valid) return setErrors(errors);

    try {
      setErrors({});
      setLoading(true);
      await realtimeDb.goOnline();
      await userSignup(email, password);

      if (file) {
        const filePath = `profileImages/${email}/${file.name}`;
        const fileRef = storage.ref(filePath);
        const uploadTask = await fileRef.put(file);
        const profileUrl = await uploadTask.ref.getDownloadURL();
        const currentUser = auth.currentUser;
        await currentUser.updateProfile({
          photoURL: profileUrl,
          displayName: username,
        });
        await chats.users.child(currentUser.uid).set({
          username: username,
          photo: profileUrl,
          email: email,
          presence: "Online",
        });
      } else {
        await auth.currentUser.updateProfile({ displayName: username });
        const currentUser = auth.currentUser;
        await chats.users.child(currentUser.uid).set({
          username: username,
          email: email,
          presence: "Online",
        });
      }

      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/email-already-in-use":
          return setErrors({ ...errors, email: "Email already in use" });
        case "auth/invalid-email":
          return setErrors({ ...errors, email: "Invalid email" });
        case "auth/weak-password":
          return setErrors({ ...errors, password: "Password is too weak" });
        default:
          captureException(err);
          return setErrors({ ...errors, auth: "Something went wrong" });
      }
    }
  }

  async function handleGoogle() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      await realtimeDb.goOnline();
      await googleSignin(withGoogle);
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);

      const providerErrors = googleProviderErrors(
        err,
        errors,
        captureException
      );

      setErrors(providerErrors);
    }
  }

  if (currentUser) {
    history.push("/");
  }

  return (
    <div className={SignupStyles.container}>
      <div className={SignupStyles.formcontainer}>
        <h1>Register!</h1>
        <p className={authError ? SignupStyles.red : ""}>
          {authError ? errors.auth : "Use your email or Google account"}
        </p>
        <form onSubmit={(e) => handleSignup(e)}>
          <Input
            type="text"
            icon={usericon}
            placeholder="Username"
            alt="username"
            onChange={handleUsername}
          />
          {errors && errors.username && <p>{errors.username}</p>}
          <Input
            type="email"
            icon={emailicon}
            placeholder="Email"
            alt="Email"
            onChange={handleEmail}
          />
          {errors && errors.email && <p>{errors.email}</p>}
          <Input
            type="password"
            icon={passwordicon}
            placeholder="Password"
            alt="Password"
            onChange={handlePassword}
          />
          {errors && errors.password && <p>{errors.password}</p>}
          <div className={SignupStyles.file}>
            <label>
              <input type="file" onChange={(e) => handleFile(e)} />
              <span>{displayFiileName}</span>
              <p>Browse</p>
            </label>
          </div>
          <Button type="submit" loading={loading} text="Signup" />
        </form>
        <div onClick={() => handleGoogle()} className={SignupStyles.google}>
          <WithGoogle text="Sign in with Google" loading={loading} />
        </div>
        {errors && errors.googleAuth && <p>{errors.googleAuth}</p>}
        <div>
          <p className={SignupStyles.login}>
            Don't have an account? &nbsp;
            <Link to="/login">
              <span className={SignupStyles.link}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
