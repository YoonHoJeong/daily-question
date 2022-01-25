import { fireDB } from "./firebase";
import {
  get,
  query,
  orderByChild,
  equalTo,
  ref,
  child,
  push,
  update,
  startAt,
  endBefore,
} from "@firebase/database";
import { calcWeek, convertDate, getToday, pad } from "./DateManager";
import { Answer, Question, QuestionsObj } from "../model/interfaces";

export const submitAnswer = async (
  uid: string,
  question: Question,
  formData: { answer: string; aid?: string }
) => {
  const aid = formData.aid || push(child(ref(fireDB), "answers")).key;
  const week = calcWeek(new Date(question.publish_date));

  // TODO: validation check
  if (!uid) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  const updates = {};

  const answerFormData = {
    aid,
    answer: formData.answer,
    created_at: convertDate(new Date()),
  };
  console.log(question, answerFormData);

  updates["/answers/" + aid] = {
    ...answerFormData,
    qid: question.qid,
    uid,
  };
  updates["/users/" + uid + "/answers/" + aid] = true;
  updates[
    "/user-answers/" +
      uid +
      "/" +
      week +
      "/" +
      question.publish_date +
      "/" +
      aid
  ] = { ...answerFormData, question };
  updates["/questions/" + question.qid + "/answers/" + aid] = true;

  console.log(updates);

  try {
    await update(ref(fireDB), updates);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const enrollQuestion = async (
  keyword: string,
  question: string,
  publish_date: string
) => {
  const updates = {};
  const newQid = push(child(ref(fireDB), "questions")).key;
  const week = calcWeek(new Date(publish_date));

  updates["/questions/" + newQid] = { keyword, question, publish_date, week };

  try {
    await update(ref(fireDB), updates);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getTodayQuestions = async () => {
  const snapshot = await get(
    query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      equalTo(getToday())
    )
  );
  const questions = snapshot.val() as QuestionsObj;
  return questions;
};

export const getAnswerByUidQid = async (uid: string, qid: string) => {
  const answerSnapshot = await get(
    query(ref(fireDB, "answers"), orderByChild("uid"), equalTo(uid))
  );
  const userAnswers = answerSnapshot.val();
  const userAnswerByQid: Answer = Object.keys(userAnswers)
    .filter((aid) => userAnswers[aid].qid === qid)
    .map((aid) => userAnswers[aid])
    .pop();

  return userAnswerByQid;
};

export const getQuestionByQid = async (qid: string) => {
  const snapshot = await get(
    query(ref(fireDB, "questions"), orderByChild("qid"), equalTo(qid))
  );
  const question = snapshot.val();
  return question;
};

export const getUserAnswers = async (
  uid: string,
  year: string,
  month: string,
  week?: string
) => {
  // 1. questions - publish_date -> year, month(, week) filter로 전부 가져오기
  // 2. answers - uid인 것 전부 가져오기(query)
  // 3. answers의 qid -> 1)에서 가져온 questions 중에서 찾기(year, month filter)
  // year - month - week - date 별로 묶기
  // answers year, month로 filter

  const nextMonth = new Date(`${year}-${month}`);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const prevMonth = `${year}-${pad(parseInt(month))}`;
  const snapshot = await get(
    query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      startAt(`${year}-${pad(parseInt(month))}`),
      endBefore(`${nextMonth.getFullYear()}-${pad(nextMonth.getMonth() + 1)}`)
    )
  );

  const questions = snapshot.val();
  console.log(questions);
};
