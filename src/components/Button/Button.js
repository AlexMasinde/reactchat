import React from "react";

import ButtonStyles from "./Button.module.css";

export default function Button({ loading, text, type }) {
  return (
    <button
      className={loading ? ButtonStyles.loading : ""}
      disabled={loading}
      type={type}
    >
      {text}
    </button>
  );
}
