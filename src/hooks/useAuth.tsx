import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseApp } from "../services/firebase";
import { UserData, useCustomUser, CustomUser } from "../services/UserApi";

interface Props {}

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

const defaultAuth: Auth = {
  user: null,
  isAuthenticating: false,
  login: async (email: string, password: string) => {
    return { status: false };
  },
  logout: async () => {
    return { status: false };
  },
  register: async (form: RegisterForm) => {
    return { status: false };
  },
};

export interface Auth {
  user: CustomUser | null;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<Response> | null;
  logout: () => Promise<Response> | null;
  register: (form: RegisterForm) => Promise<Response>;
}

export interface UserProfileData {
  [key: string]: string | number;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthContext = React.createContext<Auth>(defaultAuth);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const { user, fetchAndSyncUserData, registerUserDataAndSync, setUserNull } =
    useCustomUser();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // log in.
        setIsAuthenticating(true);

        await fetchAndSyncUserData(user.uid);
        setIsAuthenticating(false);
      } else {
        // log out.
        setUserNull();
        setIsAuthenticating(false);
      }
    });

    return () => unsubAuth();
  }, [auth]);

  const login = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true);

      const { user: fireUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await fetchAndSyncUserData(fireUser.uid);
      setIsAuthenticating(false);

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;

      let error;

      if (authErrorMsgs[firebaseError.code]) {
        error = authErrorMsgs[firebaseError.code];
      } else {
        error = authErrorMsgs["default"];
      }

      setUserNull();
      setIsAuthenticating(false);

      return { status: false, error };
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticating(true);

      const confirmMessage = "로그아웃 하시겠어요?";
      const response = window.confirm(confirmMessage);

      if (response) {
        await auth.signOut();
      }
      setIsAuthenticating(false);

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let error;
      switch (firebaseError.code) {
        default:
          error = authErrorMsgs["default"];
      }
      setIsAuthenticating(false);

      return { status: false, error };
    }
  };

  const register = async (formData: RegisterForm) => {
    const form = { ...formData };

    try {
      formValidation(form);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const {
        user: { uid },
      } = userCredential;
      const newUserData: UserData = {
        uid,
        admin: false,
        profile: { name: form.name, email: form.email },
      };

      await registerUserDataAndSync(uid, newUserData);

      return { status: true };
    } catch (e: any) {
      let error;
      const errorType = new Error(e).message.split(": ")[1];
      if (authErrorMsgs[errorType]) {
        error = authErrorMsgs[errorType];
      } else {
        error = authErrorMsgs["default"];
      }
      setUserNull();

      return { status: false, error };
    }
  };

  return {
    user,
    isAuthenticating,
    login,
    logout,
    register,
  };
};

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
  "auth/wrong-password": {
    field: "password",
    message: "비밀번호가 일치하지 않습니다.",
  },
  "auth/too-many-requests": {
    field: "password",
    message: "로그인 횟수가 초과되었습니다. \n잠시 뒤 다시 시도해주세요.",
  },
  default: {
    field: "default",
    message: "오류가 발생했습니다. 잠시 뒤 다시 시도해주세요.",
  },
};

const formValidation = (form: RegisterForm) => {
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
