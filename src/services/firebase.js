import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZkKQu5Q0uweMFST5MeVDX7Z54o5xAvxw",
  authDomain: "daily-question-31c05.firebaseapp.com",
  databaseURL: "https://daily-question-31c05-default-rtdb.firebaseio.com",
  projectId: "daily-question-31c05",
  storageBucket: "daily-question-31c05.appspot.com",
  messagingSenderId: "997423654687",
  appId: "1:997423654687:web:4875aa710da194bf87b22a",
  measurementId: "G-MJG5XVRZ8R",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export default app;
export const db = getDatabase(app);
