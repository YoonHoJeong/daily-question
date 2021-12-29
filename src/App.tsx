import React, { createContext, useEffect, useState } from "react";
import "./app.css";
import GlobalStyles from "./components/GlobalStyles";
import { Router } from "./components/router";
import { loginWithId } from "./services/auth";
import styles from "./styles.module.css";
import { auth, fireDB } from "./services/firebase";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "@firebase/auth";
import { AuthProvider } from "./hooks/useAuth";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-211720916-1";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

export function sendPageView() {
  const path = window.location.pathname;

  ReactGA.pageview(path);
}
interface User {
  answers: string[];
  uid: string;
}

interface Auth {
  user: User | null;
  login: (id: string) => Promise<any>;
}

export const UserContext = createContext<Auth | null>(null);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<Boolean>(true);

  useEffect(() => {
    sendPageView();
  }, []);

  useEffect(() => {
    if (user !== null) {
      const userRef = ref(fireDB, `users/${user.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        setUser((user) => ({ ...user, ...snapshot.val() }));
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticating(false);
    });
  }, [user]);

  const value = {
    user,
    login: async (id: string) => {
      const user = await loginWithId(id);

      setUser(user);
      return user;
    },
    isAuthenticating,
  };

  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};

function App() {
  return (
    <div className={styles.app}>
      <GlobalStyles />
      <UserProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </UserProvider>
    </div>
  );
}

export default App;
