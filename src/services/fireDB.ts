import {
  AnswerWithQuestion,
  DateQidAnswers,
  DateQuestionsAndAnswers,
  FetchedAnswers,
  User,
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
  limitToLast,
} from "@firebase/database";
import {
  calcWeek,
  convertDate,
  convertDateUntilDay,
  getToday,
} from "./DateManager";
import { Answer, Question, FetchedQuestions } from "../model/interfaces";
import AdminAnswers from "../routes/admin/AdminAnswers";
import { formatAnswersToDateQidAnswers } from "./utils";

const getAllAnswers = async (size?: number) => {
  const answers: FetchedAnswers = (await get(ref(fireDB, "answers"))).val();
  return answers;
};

export const getDateQuestionAnswers = async () => {
  const answers = await getAllAnswers();

  // formatting
  const dateQidAnswers: DateQidAnswers = Object.keys(answers).reduce(
    (prev, tmpAid) => {
      const answer = answers[tmpAid];
      const {
        question,
        question: { publish_date },
        qid,
        aid,
      } = answer;

      if (!prev[publish_date]) {
        prev[publish_date] = {};
      }
      if (!prev[publish_date][qid]) {
        prev[publish_date][qid] = { question, answers: {} };
      }

      prev[publish_date][qid].answers[aid] = answer;

      return prev;
    },
    {}
  );

  console.log(dateQidAnswers);
};

export const updateAnswer = async (
  answer: Answer,
  form: { [key: string | number]: any }
) => {
  const updates = {};
  Object.keys(form).forEach((key) => {
    updates[`answers/${answer.aid}/${key}`] = form[key];
    updates[`user-answers/${answer.uid}/${answer.aid}/${key}`] = form[key];
  });

  await update(ref(fireDB), updates);
};

// export const setAnswerPublic = async (answer: Answer) => {
//   await updateAnswer(answer, { isPulic: true });
// };
// export const setAnswerPrivate = async (answer: Answer) => {
//   await updateAnswer(answer, { isPulic: false });
// };
// export const setAnswerAnonymous = async (answer: Answer) => {
//   await updateAnswer(answer, { isAnonymous: true });
// };
// export const setAnswerRealname = async (answer: Answer) => {
//   await updateAnswer(answer, { isAnonymous: false });
// };

export const submitAnswer = async (
  userData: User,
  question: Question,
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
  const answerData: Answer = {
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

export const getTodayQuestions = async () => {
  let queryForQuestions;

  if (process.env.NODE_ENV === "development") {
    queryForQuestions = query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      limitToLast(3)
    );
  } else {
    queryForQuestions = query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      equalTo(getToday())
    );
  }

  try {
    const snapshot = await get(queryForQuestions);

    const questions = snapshot.val() as FetchedQuestions;
    return questions;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const getBoardAnswers = async () => {
  const answers: FetchedAnswers = (
    await get(
      query(ref(fireDB, "answers"), orderByChild("isPublic"), equalTo(true))
    )
  ).val();

  const dateQidAnswers = formatAnswersToDateQidAnswers(answers);

  return dateQidAnswers;
};

export const getUserAnswers = async (uid: string) => {
  const userAnswers: FetchedAnswers = (
    await get(query(ref(fireDB, `user-answers/${uid}`)))
  ).val();

  return userAnswers;
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

export const getMonthlyUserAnswers = async (uid: string) => {
  const answers = (await get(ref(fireDB, `user-answers/${uid}`))).val();

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

export const getAllQuestions = async () => {
  const questions = (await get(ref(fireDB, "questions"))).val();

  return questions;
};
async function getAnswerByAid(aid: string) {
  const answer = (await get(ref(fireDB, "answers/" + aid))).val();

  return answer;
}
export async function getUserKeptAnswers(uid: string) {
  const userKeepsAids = await getUserKeepsAids(uid);
  const questions: FetchedQuestions = await getAllQuestions();
  const promises = Object.keys(userKeepsAids).map((aid) => getAnswerByAid(aid));
  const userKeptAnswersList = await Promise.all(promises);

  const userKeptAnswers: DateQuestionsAndAnswers = {};

  // convert into object
  for (let answer of userKeptAnswersList) {
    const date = convertDateUntilDay(new Date(answer.created_at));
    const question = questions[answer.qid];

    if (!userKeptAnswers[date]) {
      userKeptAnswers[date] = {};
    }

    if (!userKeptAnswers[date][question.qid]) {
      userKeptAnswers[date][question.qid] = {
        ...question,
        answers: {},
      };
    }

    userKeptAnswers[date][question.qid].answers[answer.aid] = answer;
  }

  return userKeptAnswers;
}
