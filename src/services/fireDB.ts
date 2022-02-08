import { FetchedAnswers } from "./../model/interfaces";
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
  endAt,
  endBefore,
  orderByKey,
  limitToLast,
} from "@firebase/database";
import {
  calcWeek,
  convertDate,
  getToday,
  getYearMonth,
  pad,
} from "./DateManager";
import { Answer, Question, FetchedQuestions } from "../model/interfaces";

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

  updates["/questions/" + newQid] = {
    qid: newQid,
    keyword,
    question,
    publish_date,
    week,
  };

  try {
    await update(ref(fireDB), updates);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getTodayQuestions = async () => {
  try {
    const snapshot = await get(
      query(
        ref(fireDB, "questions"),
        orderByChild("publish_date"),
        equalTo(getToday())
      )
    );

    const questions = snapshot.val() as FetchedQuestions;
    return questions;
  } catch (e) {
    console.error(e);
  }
};

export const getBoardAnswers = async () => {
  let answers: FetchedAnswers = (
    await get(
      query(ref(fireDB, "answers"), orderByChild("created_at"), limitToLast(30))
    )
  ).val();
  let questions: FetchedQuestions = (await get(ref(fireDB, "questions"))).val();

  const answersWithQuestion = {};

  Object.keys(answers)
    .sort((a, b) => (a > b ? 1 : -1))
    .forEach((aid) => {
      const answer = answers[aid];
      const question = questions[answer.qid];

      if (!Object.keys(answersWithQuestion).includes(question.publish_date)) {
        answersWithQuestion[question.publish_date] = {};
      }

      if (
        !Object.keys(answersWithQuestion[question.publish_date]).includes(
          question.qid
        )
      ) {
        answersWithQuestion[question.publish_date][question.qid] = {
          ...question,
          answers: {
            [aid]: {
              ...answer,
            },
          },
        };
      } else {
        answersWithQuestion[question.publish_date][question.qid].answers[aid] =
          {
            ...answer,
          };
      }
    });

  return answersWithQuestion;
};

export const getAnswerByUidQid = async (uid: string, qid: string) => {
  const answerSnapshot = await get(
    query(ref(fireDB, "answers"), orderByChild("uid"), equalTo(uid))
  );
  const userAnswers = answerSnapshot.val() || {};

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
  year: number,
  month: number
) => {
  const presentMonth = getYearMonth(year, month);
  const nextMonth = getYearMonth(year, month + 1);

  const snapshot = await get(
    query(
      ref(fireDB, `user-answers/${uid}`),
      orderByKey(),
      startAt(presentMonth),
      endBefore(nextMonth)
    )
  );

  const answers = snapshot.val();

  return answers;
};

export const toggleKeep = async (
  uid: string | undefined,
  aid: string,
  value: boolean
) => {
  // update db
  // 1. answers, 2. user-answers, 3. users

  if (!uid) {
    console.log("no uid");

    return false;
  }

  const updates = {};

  if (value) {
    // updates['user-answers/' + uid + '/keeps/' + aid] = true;
    updates["answers/" + aid + "/keepers/" + uid] = true;
    updates["users/" + uid + "/keeps/" + aid] = true;
  } else {
    // updates['user-answers/' + uid + '/keeps/' + aid] = null;
    updates["answers/" + aid + "/keepers/" + uid] = null;
    updates["users/" + uid + "/keeps/" + aid] = null;
  }

  try {
    await update(ref(fireDB), updates);
    console.log(value ? "keep" : "unkeep");
  } catch (e) {
    console.log(e);
  }
};
