import { useState } from "react";
import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";

import UserListItem from "../UserListItem/UserListItem";
import SearchBar from "../SearchBar/SearchBar";

import UserListStyles from "./UserList.module.css";

export default function UserList() {
  const { allUsers, showUserList, dispatch, conversations } = useChat();

  const users = allUsers.filter((user) => {
    return conversations.every((conversation) => {
      return conversation.conversationWith !== user.uid;
    });
  });

  const [displayUsers, setDisplayUsers] = useState(users);

  function toggleUserList() {
    dispatch({
      type: "SHOW_USER_LIST",
      payload: !showUserList,
    });
  }

  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.trim() === "") {
      setDisplayUsers(users);
      return;
    }
    const filteredUsers = allUsers.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm)
    );
    setDisplayUsers(filteredUsers);
  }

  return (
    <div className={UserListStyles.container}>
      {console.log(users)}
      <div className={UserListStyles.header}>
        <p>Select User</p>
        <p onClick={() => toggleUserList()}>Close</p>
      </div>
      <div className={UserListStyles.searchbar}>
        <SearchBar text="Search Users" onChange={handleSearch} />
      </div>
      <div className={UserListStyles.list}>
        {displayUsers.map((user) => {
          return <UserListItem user={user} key={shortid()} />;
        })}
      </div>
    </div>
  );
}
