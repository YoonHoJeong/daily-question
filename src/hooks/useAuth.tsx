import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseApp } from "../services/firebase";

interface Props {}
interface Auth {
  user: CustomUser | null;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (form: RegisterForm) => Promise<boolean>;
}

interface CustomUser {
  name: string;
  email?: string | null;
  uid: string;
  admin: boolean;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = React.createContext<Auth | null>(null);
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth(firebaseApp);

  const formatUser = async (user: User | null) => {
    if (user) {
      const token = await user.getIdTokenResult();

      setUser({
        name: user.displayName || "undefined",
        email: user.email,
        uid: user.uid,
        admin: token.claims.admin ? true : false,
      });
    } else {
      setUser(null);
    }

    setIsAuthenticating(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      formatUser(user);
    } catch (e: any) {
      let error = null;
      if (e.code) {
        switch (e.code) {
          case "auth/user-not-found":
            error = "등록되지 않은 이메일입니다.";
            alert(error);
            break;
        }
      } else {
        alert(e);
        console.error(e);
      }

      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (form: RegisterForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // name 설정
      formatUser(userCredential.user);
      console.log("가입 완료");
      

      return true;
    } catch (e) {
      console.error(e);

      formatUser(null);
      console.log("가입 실패");

      return false;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // When user is signed in.
        console.log("user logged in", auth);
        formatUser(user);
      } else {
        // When User is not signed in.
        console.log("logged out", auth);
        formatUser(null);
      }
    });

    return () => unsub();
  }, [auth]);

  return { user, isAuthenticating, login, logout, register };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
