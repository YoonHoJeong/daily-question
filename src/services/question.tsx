// 질문 불러오기

import { child, get, push, ref, update } from "@firebase/database";
import { fireDB } from "./firebase";

export const getQuestion = async (category: string) => {
  const dbRef = ref(fireDB);

  try {
    const snapshot = await get(child(dbRef, `questions/${category}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
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

export const submitAnswer = async (uid: string | null, formData: FormData) => {
  const answerRef = ref(fireDB, `/users/${uid}/answers`);
  const newAnswerRef = push(answerRef);

  update(newAnswerRef, {
    question: formData.question,
    answer: formData.answer,
  });
};

export const submitRate = async (
  uid: string | null,
  category: string,
  rate: string
) => {
  const rateRef = ref(fireDB, `/questions/${category}/rates`);
  const newRateRef = push(rateRef);

  update(newRateRef, {
    uid,
    rate,
  });
};
