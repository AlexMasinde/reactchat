import shortid from "shortid";

import { useChat } from "../../contexts/ChatContext";

import UserListItem from "../UserListItem/UserListItem";
import SearchBar from "../SearchBar/SearchBar";

import UserListStyles from "./UserList.module.css";

export default function UserList() {
  const { allUsers } = useChat();
  return (
    <div className={UserListStyles.container}>
      <SearchBar text="Search Users" />
      {allUsers.map((user) => {
        return <UserListItem user={user} key={shortid()} />;
      })}
    </div>
  );
}
