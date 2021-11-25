// 질문 불러오기
import {
  child,
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  update,
} from "@firebase/database";
import { getToday } from "./dateService";
import { fireDB } from "./firebase";

function addZero(number: number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function formatDate(date: Date) {
  let month = date.getMonth() + 1;

  const dateString = `${date.getFullYear()}-${addZero(month)}-${addZero(
    date.getDate()
  )}T${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
    date.getSeconds()
  )}`;
  return dateString;
}
export function formatDateUntilDay(date: Date) {
  let month = date.getMonth() + 1;

  const dateString = `${date.getFullYear()}-${addZero(month)}-${addZero(
    date.getDate()
  )}`;

  return dateString;
}

export const getTodayQuestions = async () => {
  const snapshot = await get(
    query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      equalTo(getToday())
    )
  );
  const questions = snapshot.val();
  return questions;
};

export const getUserAnswers = async (user: any) => {
  const answers = user.answers ? user.answers : {};
  const snapshot = await get(ref(fireDB, "/answers"));
  const allAnswers = snapshot.val();
  const qsnapshot = await get(ref(fireDB, `questions`));

  const questions = qsnapshot.val();
  const result: any[] = Object.keys(allAnswers)
    .filter((aid) => Object.keys(answers).includes(aid))
    .map((aid) => {
      const ans = allAnswers[aid];
      const { qid } = ans;

      return {
        ...ans,
        question: questions[qid].question,
        keyword: questions[qid].keyword,
      };
    });

  return result;
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
  const answerRef = ref(fireDB, `/answers`);
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
  qid: string,
  degree?: number,
  comment?: string | null
) => {
  const newRid = push(ref(fireDB, `/rates`)).key;

  const updates = {};
  const created_at = formatDate(new Date());

  updates[`/rates/${newRid}`] = {
    uid,
    qid,
    rid: newRid,
    degree,
    comment,
    created_at,
  };
  updates[`/questions/${qid}/rates/${newRid}`] = true;
  updates[`/users/${uid}/rates/${newRid}`] = true;

  await update(ref(fireDB), updates);
};
