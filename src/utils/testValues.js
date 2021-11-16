export const messages = [
  {
    uid: "1234",
    text: "Hello World",
    read: false,
    sender: "user1",
    sentAt: "1635470064870",
  },
  {
    uid: "2345",
    text: "New text",
    read: false,
    sender: "user1",
    sentAt: "1635470064879",
  },
  {
    uid: "3456",
    text: "Greetings from Santa",
    read: false,
    sender: "user1",
    sentAt: "1635470064885",
  },
  {
    uid: "4567",
    text: "Hello World",
    read: false,
    sender: "user2",
    sentAt: "1635470064890",
  },
];

export const selectedUser = {
  uid: "user2",
  username: "John Doe",
  photo: "https://randomuser.me/api/portraits/",
  presence: "Offline",
  lastSeen: "1636998754498",
  email: "john@gmail.com",
};

export const currentUser = {
  uid: "user1",
  photoURL: "https://randomuser.me/api/portraits/",
  displayName: "Jane Doe",
  email: "jane@gmail.com",
};

export const conversations = [
  {
    uid: "user1:user2",
    conversationWith: "user2",
    startedAt: "1636184402378",
    lastMessage: {
      message: "this is an unread message",
      read: false,
      sender: "user2",
      sentAt: "1636797959703",
    },
  },
  {
    uid: "user1:user3",
    conversationWith: "user3",
    startedAt: "1636184402390",
    lastMessage: {
      message: "this is a read message",
      read: false,
      sender: "user1",
      sentAt: "1636184402398",
    },
  },
];

export const selectedChat = {
  uid: "user1:user2",
  conversationWith: "user2",
  startedAt: "1636184402378",
  lastMessage: {
    message: "this is an unread message",
    read: false,
    sender: "user2",
    sentAt: "1636797959703",
  },
};

export const allUsers = [
  {
    uid: "user2",
    username: "John Doe",
    photo: "https://randomuser.me/api/portraits/",
    presence: "Offline",
    lastSeen: "1636998754498",
    email: "john@gmail.com",
  },
  {
    uid: "user3",
    username: "Mary Smith",
    photo: "https://randomuser.me/api/portraits/",
    presence: "Online",
    lastSeen: "1636998754500",
    email: "smith@gmail.com",
  },
];
