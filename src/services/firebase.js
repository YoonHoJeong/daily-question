import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "@firebase/auth";

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
export const auth = getAuth(app);
export const fireDB = getDatabase(app);
export const analytics = getAnalytics(app);
export const gaLog = (tag) => {
  logEvent(analytics, tag);
};
