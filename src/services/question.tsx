// 질문 불러오기

import { child, get, ref, set, update } from "@firebase/database";
import { fireDB } from "./firebase";

export const getQuestion = async (category: string) => {
  const dbRef = ref(fireDB);

  try {
    const snapshot = await get(child(dbRef, `questions/${category}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return await snapshot.val();
    } else {
      console.log("No User Data.");
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface FormData {
  category: string;
  question: string;
  answer: string;
  rate: string;
}

interface Updates {}

export const submitAnswer = async (uid: string | null, formData: FormData) => {
  const dbRef = ref(fireDB, `/users/${uid}/answers/`);

  const updates = {
    [formData.question]: formData.answer,
  };
  update(dbRef, updates);
};
