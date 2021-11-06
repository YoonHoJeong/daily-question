import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../services/firebase";
import firebase from "firebase/auth";
import React from "react";

export interface User {
  uid: string;
}
export interface Auth {
  login: (email: string, password: string) => Promise<firebase.User | null>;
  user: User | null;
  isAuthenticating: Boolean;
}
export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<Boolean>(true);

  const auth = getAuth(app);

  const handleUser = (rawUser: firebase.User | null = null) => {
    if (rawUser !== null) {
      setUser({ uid: rawUser.uid });
      setIsAuthenticating(false);
    } else {
      setUser(null);
      setIsAuthenticating(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleUser(userCredential.user);

      return userCredential.user;
    } catch (e) {
      console.log(e);
      handleUser();

      return null;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticating(true);
      if (user === null) {
        handleUser();
      } else {
        handleUser(user);
      }
    });
    return () => unsub();
  }, [auth]);

  const value = { login, user, isAuthenticating };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
