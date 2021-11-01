import React, { createContext, useEffect, useState } from "react";
import "./app.css";
import GlobalStyles from "./components/GlobalStyles";
import { Router } from "./components/router";
import { loginWithId } from "./services/auth";
import styles from "./styles.module.css";
import { fireDB } from "./services/firebase";
import { onValue, ref } from "firebase/database";

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
  const value = {
    user,
    login: async (id: string) => {
      const user = await loginWithId(id);

      setUser(user);
      return user;
    },
  };
  useEffect(() => {
    if (user !== null) {
      const userRef = ref(fireDB, `users/${user.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        setUser((user) => ({ ...user, ...snapshot.val() }));
      });

      return () => unsubscribe();
    }
  }, [user]);

  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};

function App() {
  return (
    <div className={styles.app}>
      <GlobalStyles />
      <UserProvider>
        <Router />
      </UserProvider>
    </div>
  );
}

export default App;
