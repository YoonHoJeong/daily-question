// 질문 불러오기

import { child, get, push, ref, update } from "@firebase/database";
import { fireDB } from "./firebase";

function addZero(number: number) {
  return number < 10 ? `0${number}` : number;
}

function formatDate(date: Date) {
  let month = date.getMonth() + 1;

  const dateString = `${date.getFullYear()}-${addZero(month)}//
  -${addZero(date.getDate())}//
  T${addZero(date.getHours())}//
  :${addZero(date.getMinutes())}//
  :${addZero(date.getSeconds())}`;
  return dateString;
}
function formatDateUntilDay(date: Date) {
  let month = date.getMonth() + 1;

  const dateString = `${date.getFullYear()}-${addZero(month)}//
  -${addZero(date.getDate())}//
  T${addZero(date.getHours())}`;

  return dateString;
}

export const getTodayQuestion = async () => {
  const snapshot = await get(ref(fireDB, "/questions"));

  const today = formatDateUntilDay(new Date());

  if (snapshot !== null) {
    const questions = snapshot.val();
    const todayQuestions = Object.keys(questions)
      .map((key) => questions[key])
      .filter((q) => today === q.publish_date);
    return todayQuestions;
  } else {
    return [];
  }
};

export const getQuestion = async (qid: string) => {
  const dbRef = ref(fireDB);

  try {
    const snapshot = await get(child(dbRef, `questions/${qid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface FormData {
  qid: string;
  answer: string;
}

export const submitAnswer = async (
  uid: string | null,
  { qid, answer }: FormData
) => {
  const answerRef = ref(fireDB, `/users/${uid}/answers`);
  const newAid = push(answerRef).key;

  const created_at = formatDate(new Date());

  const updates = {};

  updates[`/questions/${qid}/answers/${newAid}`] = true;
  updates[`/users/${uid}/answers/${newAid}`] = true;
  updates[`/answers/${newAid}`] = { qid, answer, created_at, aid: newAid, uid };

  update(ref(fireDB), updates);
};

export const submitRate = async (
  uid: string | null,
  category: string,
  rate: number,
  comment: string | null
) => {
  const rateRef = ref(fireDB, `/questions/${category}/rates`);
  const newRateRef = push(rateRef);

  update(newRateRef, {
    uid,
    rate,
    comment,
  });
};
