// 질문 불러오기

import { child, get, push, ref, update } from "@firebase/database";
import { fireDB } from "./firebase";

const SERVICE_LAUNCH_DATE = "2021-11-01";

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

export const getQuestionsUntilToday = async () => {
  const snapshot = await get(ref(fireDB, "/questions"));

  const today = formatDateUntilDay(new Date());
  let questionsSortByDate = {};

  if (snapshot !== null) {
    const questions = snapshot.val();

    const questionsUntilToday = Object.keys(questions)
      .map((key) => questions[key])
      .filter(
        (q) =>
          new Date(today) >= new Date(q.publish_date) &&
          new Date(q.publish_date) >= new Date(SERVICE_LAUNCH_DATE)
      )
      .forEach((q) => {
        questionsSortByDate[q.publish_date] !== undefined
          ? questionsSortByDate[q.publish_date].push(q)
          : (questionsSortByDate[q.publish_date] = [q]);
      });

    return questionsSortByDate;
  } else {
    return {};
  }
};

export const getUserAnswers = async (user: any) => {
  const { answers } = user;
  const snapshot = await get(ref(fireDB, "/answers"));
  const allAnswers = snapshot.val();
  const qsnapshot = await get(ref(fireDB, `questions`));

  const questions = qsnapshot.val();
  const result: any[] = [];

  Object.keys(allAnswers)
    .filter((aid) => Object.keys(answers).includes(aid))
    .map((aid) => {
      const ans = allAnswers[aid];
      const { qid } = ans;

      result.push({ ...ans, question: questions[qid].question });
    });

  return result;
};

export const getTodayQuestions = async () => {
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
