import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { firebaseApp } from "../services/firebase";

interface Props {}
interface Auth {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

interface User {
  name: string;
  email?: string | null;
}

export const AuthContext = React.createContext<Auth | null>(null);
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebaseApp);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        name: user.displayName || "undefined",
        email: user.email,
      });
    } catch (e: any) {
      if (e.code) {
        switch (e.code) {
          case "auth/user-not-found":
            const error = "등록되지 않은 이메일입니다.";
            break;
        }
      } else {
        console.error(e);
      }

      setUser(null);
    }
  };

  return { user, login };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
