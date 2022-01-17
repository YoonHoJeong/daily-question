import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseApp } from "../services/firebase";

interface Props {}
interface Auth {
  user: User | null;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
}

interface User {
  name: string;
  email?: string | null;
  uid: string;
}

export const AuthContext = React.createContext<Auth | null>(null);
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth(firebaseApp);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        name: user.displayName || "undefined",
        email: user.email,
        uid: user.uid,
      });
    } catch (e: any) {
      let error = null;
      if (e.code) {
        switch (e.code) {
          case "auth/user-not-found":
            error = "등록되지 않은 이메일입니다.";
            break;
        }
      } else {
        console.error(e);
      }

      setUser(null);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // When user is signed in.
        console.log("user logged in", auth);
        setUser({
          name: user.displayName || "undefined",
          email: user.email,
          uid: user.uid,
        });
        setIsAuthenticating(false);
      } else {
        // When User is not signed in.
        console.log("logged out", auth);
        setUser(null);
        setIsAuthenticating(false);
      }
    });

    return () => unsub();
  }, [auth]);

  return { user, isAuthenticating, login };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
