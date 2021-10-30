import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";

import UserListItem from "../UserListItem/UserListItem";
import SearchBar from "../SearchBar/SearchBar";

import UserListStyles from "./UserList.module.css";

export default function UserList() {
  const { allUsers, showUserList, dispatch } = useChat();

  function toggleUserList() {
    dispatch({
      type: "SHOW_USER_LIST",
      payload: !showUserList,
    });
  }

  return (
    <div className={UserListStyles.container}>
      <div className={UserListStyles.header}>
        <p>New Message</p>
        <p onClick={() => toggleUserList()}>Close</p>
      </div>
      <div className={UserListStyles.searchbar}>
        <SearchBar text="Search Users" />
      </div>
      <div className={UserListStyles.list}>
        {allUsers.map((user) => {
          return <UserListItem user={user} key={shortid()} />;
        })}
      </div>
    </div>
  );
}
