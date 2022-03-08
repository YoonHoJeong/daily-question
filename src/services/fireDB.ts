import { User } from "./../model/interfaces";
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
import { calcWeek, convertDate, convertDateUntilDay } from "./DateManager";
import { AnswerType, QuestionType } from "../model/interfaces";

export const submitAnswer = async (
  userData: User,
  question: QuestionType,
  formData: {
    answer: string;
    aid?: string;
    isAnonymous: boolean;
    isPublic: boolean;
  }
) => {
  const aid = formData.aid || push(child(ref(fireDB), "answers")).key;
  const week = calcWeek(new Date(question.publish_date));
  // TODO: validation check
  if (!userData.uid) {
    alert("로그인 후 이용해주세요.");
    return;
  }
  if (!aid) {
    throw new Error("unknown error");
  }
  const updates = {};
  const answerData: AnswerType = {
    aid,
    answer: formData.answer,
    created_at: convertDate(new Date()),
    week,
    qid: question.qid,
    uid: userData.uid,
    user: userData,
    question: {
      ...question,
      answers: {
        [aid]: true,
      },
    },
    isAnonymous: formData.isAnonymous,
    isPublic: formData.isPublic,
  };

  updates["answers/" + aid] = answerData;
  updates["users/" + userData.uid + "/answers/" + aid] = true;
  updates["user-answers/" + userData.uid + "/" + aid] = answerData;
  updates["questions/" + question.qid + "/answers/" + aid] = true;

  await update(ref(fireDB), updates);
};

export const fetchFireDBData = async (
  path: string,
  filter: { by: string; value: string | number }
) => {
  const dataRef = query(
    ref(fireDB, path),
    orderByChild(filter.by),
    equalTo(filter.value)
  );

  const data = (await get(dataRef)).val();

  return data;
};
