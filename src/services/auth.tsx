// 등록된 유저인지 확인

import { child, get, ref } from "@firebase/database";
import { auth, fireDB } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginWithId = async (id: string) => {
  const dbRef = ref(fireDB);

  try {
    const snapshot = await get(child(dbRef, `users/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      alert("등록되지 않은 사용자입니다.");
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
