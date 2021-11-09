import React from "react";

import logo from "../../icons/logo.svg";

import LoadingStyles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={LoadingStyles.container}>
      <img src={logo} alt="loading" />
      <p>Loading..</p>
    </div>
  );
}
