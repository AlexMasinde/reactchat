import React from "react";

import searchicon from "../../icons/search.svg";

import SearchBarStyles from "./SearchBar.module.css";

export default function SearchBar({ text, onChange }) {
  return (
    <div className={SearchBarStyles.container}>
      <img src={searchicon} alt="search" />
      <input onChange={onChange} type="text" placeholder={text} />
    </div>
  );
}
