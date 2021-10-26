import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const storage = app.storage();
const firestore = app.firestore();

const realtimeDb = app.database();

const chats = {
  users: realtimeDb.ref("users/"),
  conversations: realtimeDb.ref("conversations/"),
  userConversations: realtimeDb.ref("userconversations/"),
  timeStamp: firebase.database.ServerValue.TIMESTAMP,
};

const database = {
  conversations: firestore.collection("conversations"),
  formatDocument: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
};

export { auth, database, storage, chats, firebase };
