import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { firebaseApp, fireDB } from "../services/firebase";

interface Props {}
export interface Auth {
  user: CustomUser | null;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => Promise<Response>;
  register: (form: RegisterForm) => Promise<Response>;
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
  password2: string;
}
export interface CustomAuthError {
  field: string;
  message: string;
}

interface Response {
  status: boolean;
  error?: CustomAuthError;
}

const authErrorMsgs = {
  "auth/user-not-found": {
    field: "email",
    message: "등록되지 않은 이메일입니다.",
  },
  "auth/weak-name": {
    field: "name",
    message: "닉네임은 2자 이상으로 입력해주세요.",
  },
  "auth/short-password": {
    field: "password",
    message: "비밀번호는 6자 이상으로 입력해주세요.",
  },
  "auth/different-password": {
    field: "password2",
    message: "비밀번호가 일치하지 않습니다.",
  },
  "auth/email-already-in-use": {
    field: "name",
    message: "이미 사용 중인 이메일입니다.",
  },
  default: {
    field: "default",
    message: "오류가 발생했습니다. 다시 시도해주세요.",
  },
};

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

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let error;

      switch (firebaseError.code) {
        case "auth/user-not-found":
          error = authErrorMsgs[firebaseError.code];
          break;
        default:
          error = authErrorMsgs["default"];
          break;
      }

      setUser(null);
      return { status: false, error };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let error;
      switch (firebaseError.code) {
        default:
          error = authErrorMsgs["default"];
      }
      return { status: false, error };
    }
  };

  const register = async (formData: RegisterForm) => {
    const form = { ...formData };
    const validate = () => {
      Object.keys(form).forEach((key) => {
        switch (key) {
          case "name":
            // 동일한 닉네임 확인
            // 2글자 이상
            if (form[key].length < 2) {
              throw new Error("auth/weak-name");
            }
            break;
          case "password":
            // password should be at least 6 characters.
            if (form[key].length < 6) {
              throw new Error("auth/short-password");
            }
            break;
          case "password2":
            // password double check
            if (form["password"] !== form[key]) {
              throw new Error("auth/different-password");
            }
            break;
        }
      });
    };

    let error = {};

    /* validate error handling */
    try {
      validate();
    } catch (error: any) {
      const errorType = new Error(error).message.split(": ")[1];

      console.log(error);
      console.log("errorType", errorType);

      switch (errorType) {
        case "auth/weak-name":
        case "auth/short-password":
        case "auth/different-password":
          error = authErrorMsgs[errorType];
          break;
        default:
          error = authErrorMsgs["default"];
          break;
      }
      formatUser(null);
      return { status: false, error };
    }

    /* firebase auth error handling */
    try {
      /* create user auth in firebase-auth */
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      /* create user auth in firebase-database */
      const updates = {};
      updates["/users/" + userCredential.user.uid] = {
        uid: userCredential.user.uid,
        name: form.name,
        email: form.email,
      };
      await update(ref(fireDB, "users"), updates);

      /* update 'user' state */
      formatUser(userCredential.user);

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          error = authErrorMsgs[firebaseError.code];
          break;
        default:
          error = authErrorMsgs["default"];
          break;
      }
      formatUser(null);

      return { status: false, error };
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // log in
        formatUser(user);
      } else {
        // log out.
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
