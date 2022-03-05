import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { get, ref, update } from "firebase/database";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { firebaseApp, fireDB } from "../services/firebase";
import { getUserAnswers } from "../services/fireDB";

interface Props {}

export interface Auth {
  user: CustomUser | null;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<Response> | null;
  logout: () => Promise<Response> | null;
  register: (form: RegisterForm) => Promise<Response>;
  updateUserProfile: (userProfileData: UserProfileData) => Promise<void>;
}
interface UserProfileData {
  [key: string]: string | number;
}

export interface CustomUser {
  uid: string;
  admin: boolean;
  profile: {
    name?: string;
    email?: string;
    intro?: string;
  };
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

const defaultAuth = {
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
} as Auth;

export const AuthContext = React.createContext<Auth>(defaultAuth);
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth(firebaseApp);

  const formatUser = useCallback(async (user: User | null) => {
    if (user) {
      try {
        const token = await user.getIdTokenResult();
        const userProfileData = await fetchUserDB(user.uid, "profile");

        setCustomUser({
          profile: {
            email: user.email || "",
            name: userProfileData?.name || "",
            intro: userProfileData?.intro || "",
          },
          uid: user.uid,
          admin: token.claims.admin ? true : false,
        });

        setIsAuthenticating(false);
      } catch (e: any) {
        const error = new Error(e);
        let timeoutCnt = 0;
        if (error.message.includes("offline")) {
          setIsAuthenticating(true);
          setTimeout(() => {
            if (timeoutCnt > 10) {
              return;
            }
            formatUser(user);
            timeoutCnt++;
          }, 1000);
        } else {
          throw new Error(e);
        }
      }
    } else {
      setCustomUser(null);
    }

    setIsAuthenticating(false);
  }, []);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // log in
        formatUser(user);
      } else {
        // log out.
        formatUser(null);
      }
    });

    return () => unsubAuth();
  }, [auth, formatUser]);

  const fetchUserDB = async (uid: string, path: string) => {
    const userData = (await get(ref(fireDB, `users/${uid}/${path}`))).val();
    return userData;
  };

  const refreshCustomUser = async () => {
    if (customUser) {
      const userProfileData = await fetchUserDB(customUser.uid, "profile");
      setCustomUser({
        ...customUser,
        profile: {
          email: userProfileData.email || "이메일을 등록해주세요.",
          name: userProfileData?.name || "익명",
          intro: userProfileData?.intro || "내 소개를 입력해주세요",
        },
      });
    } else {
      throw new Error("user not logged in");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      formatUser(user);

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;

      let error;

      if (authErrorMsgs[firebaseError.code]) {
        error = authErrorMsgs[firebaseError.code];
      } else {
        error = authErrorMsgs["default"];
      }

      setCustomUser(null);
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

    let error;
    let status = true;

    /* validate error handling */
    try {
      formValidation(form);
    } catch (e: any) {
      const errorType = new Error(error).message.split(": ")[1];
      if (authErrorMsgs[errorType]) {
        error = authErrorMsgs[errorType];
      } else {
        error = authErrorMsgs["default"];
      }
      formatUser(null);
      status = false;

      return { status, error };
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
      const userDBData = {
        uid: userCredential.user.uid,
        "profile/name": form.name,
        "profile/email": form.email,
      };
      await updateUserDB(userCredential.user.uid, userDBData);

      /* update 'user' state */
      formatUser(userCredential.user);

      return { status: true };
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let error;

      if (authErrorMsgs[firebaseError.code]) {
        error = authErrorMsgs[firebaseError.code];
      } else {
        error = authErrorMsgs["default"];
      }
      formatUser(null);

      return { status: false, error };
    }
  };

  const updateUserProfile = async (userProfileData: UserProfileData) => {
    const userData = Object.keys(userProfileData).reduce(
      (userData, key) => ({
        ...userData,
        [`profile/${key}`]: userProfileData[key],
      }),
      {}
    );
    await updateUserDB(customUser!!.uid, userData);
  };

  const updateUserDB = async (uid: string, userData: UserProfileData) => {
    const userAnswers = await getUserAnswers(uid);
    const updates = Object.keys(userData).reduce((userProfile, key) => {
      Object.keys(userAnswers).forEach((aid) => {
        userProfile[`user-answers/${uid}/${aid}/user/${key}`] = userData[key];
        userProfile[`answers/${aid}/user/${key}`] = userData[key];
      });
      userProfile[`users/${uid}/${key}`] = userData[key];

      return userProfile;
    }, {});

    await update(ref(fireDB), updates);
    await refreshCustomUser();
  };

  return {
    user: customUser,
    isAuthenticating,
    login,
    logout,
    register,
    updateUserProfile,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
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
