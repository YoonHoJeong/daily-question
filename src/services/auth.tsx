// 등록된 유저인지 확인

import { child, get, ref } from "@firebase/database";
import { fireDB } from "./firebase";

export const loginWithId = async (id: String) => {
  const dbRef = ref(fireDB);

  try {
    const snapshot = await get(child(dbRef, `users/${id}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No User Data.");
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
