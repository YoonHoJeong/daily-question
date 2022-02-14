import {
  DailyAnswersWithQuestions,
  FetchedAnswers,
} from "./../model/interfaces";
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
  orderByKey,
  limitToLast,
} from "@firebase/database";
import {
  calcWeek,
  convertDate,
  convertDateUntilDay,
  getToday,
  getYearMonth,
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

  const answersWithQuestion: DailyAnswersWithQuestions = {};

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

const toggleKeep = async (uid: string, aid: string, value: true | null) => {
  const updates = {};

  // updates['user-answers/' + uid + '/keeps/' + aid] = true;
  updates["answers/" + aid + "/keepers/" + uid] = value;
  updates["users/" + uid + "/keeps/" + aid] = value;

  try {
    await update(ref(fireDB), updates);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
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

export const keep = async (uid: string | undefined, aid: string) => {
  if (uid) {
    toggleKeep(uid, aid, true);
  }
};
export const unKeep = async (uid: string | undefined, aid: string) => {
  if (uid) {
    toggleKeep(uid, aid, null);
  }
};

export const getUserKeepsAids = async (uid: string) => {
  const userKeepsAids = (
    await get(ref(fireDB, "users/" + uid + "/keeps"))
  ).val();
  return userKeepsAids || {};
};

export const getUserKeeps = async (uid: string) => {
  const userKeepsAids = await getUserKeepsAids(uid);
  const questions: FetchedQuestions = (
    await get(ref(fireDB, "questions"))
  ).val();
  const userKeeps = {};

  for (let i = 0; i < Object.keys(userKeepsAids).length; i++) {
    const aid = Object.keys(userKeepsAids)[i];
    const snapshot = await get(ref(fireDB, "answers/" + aid));
    const userKeepAnswer = snapshot.val() as Answer;

    const date = convertDateUntilDay(new Date(userKeepAnswer.created_at));
    const question = questions[userKeepAnswer.qid];

    if (!userKeeps[date]) {
      userKeeps[date] = {};
    }

    if (!userKeeps[date][question.qid]) {
      userKeeps[date][question.qid] = {
        ...question,
        answers: {},
      };
    }

    userKeeps[date][question.qid].answers[aid] = userKeepAnswer;
  }

  return userKeeps as DailyAnswersWithQuestions;
};
