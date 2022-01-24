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
} from "@firebase/database";
import { convertDate, getToday } from "./DateManager";
import { Answer, Question, QuestionsObj } from "../model/interfaces";

export const submitAnswer = async (
  uid: string,
  qid: string,
  formData: { answer: string; aid?: string }
) => {
  const aid = formData.aid || push(child(ref(fireDB), "answers")).key;

  // TODO: validation check
  if (!uid) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  const updates = {};

  const answerFormData = {
    qid,
    aid,
    uid,
    answer: formData.answer,
    created_at: convertDate(new Date()),
  };
  updates["/answers/" + aid] = answerFormData;
  updates["/users/" + uid + "/answers/" + aid] = true;
  updates["/questions/" + qid + "/answers/" + aid] = true;

  try {
    await update(ref(fireDB), updates);
  } catch (e) {
    console.error(e);
  }
};

export const enrollQuestion = async (
  keyword: string,
  question: string,
  publish_date: string
) => {
  const updates = {};
  const newQid = push(child(ref(fireDB), "questions")).key;

  updates["/questions/" + newQid] = { keyword, question, publish_date };

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
