import {
  AnswerWithQuestion,
  DateQuestionsAndAnswers,
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

export const updateAnswer = async (
  answer: AnswerWithQuestion,
  form: { [key: string | number]: any }
) => {
  const updates = {};
  const convertedDate = convertDateUntilDay(
    new Date(answer.question.publish_date)
  );
  const week = answer.week ?? calcWeek(new Date(answer.question.publish_date));

  console.log(convertedDate, week);

  Object.keys(form).forEach((key) => {
    updates[`answers/${answer.aid}/${key}`] = form[key];
    updates[
      `user-answers/${answer.uid}/${week}/${convertedDate}/${answer.aid}/${key}`
    ] = form[key];
    updates[`user-answers/${answer.uid}/${answer.aid}/${key}`] = form[key];
  });

  // console.log(updates);

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
  uid: string,
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
  if (!uid) {
    alert("로그인 후 이용해주세요.");
    return;
  }
  if (!aid) {
    throw new Error("unknown error");
  }
  const updates = {};
  const answerFormData = {
    aid,
    answer: formData.answer,
    isAnonymous: formData.isAnonymous,
    isPublic: formData.isPublic,
    created_at: convertDate(new Date()),
    week,
  };
  const answerData: Answer = {
    ...answerFormData,
    qid: question.qid,
    question,
    uid,
  };
  const answerWithQuestionData: AnswerWithQuestion = {
    ...answerData,
    question,
  };
  updates["/answers/" + aid] = answerData;
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
  ] = answerWithQuestionData;
  updates["/questions/" + question.qid + "/answers/" + aid] = true;
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
  return answers;
};

// export const getBoardAnswers = async () => {
//   let answers: FetchedAnswers = (
//     await get(query(ref(fireDB, "answers"), orderByChild("isPublic")))
//   ).val();
//   let questions: FetchedQuestions = (await get(ref(fireDB, "questions"))).val();

//   const answersWithQuestion: DateQuestionsAndAnswers = {};

//   Object.keys(answers)
//     .filter((aid) => answers[aid].isPublic)
//     .sort((a, b) => (a > b ? 1 : -1))
//     .forEach((aid) => {
//       const answer = answers[aid];
//       const question = questions[answer.qid];

//       if (!Object.keys(answersWithQuestion).includes(question.publish_date)) {
//         answersWithQuestion[question.publish_date] = {};
//       }

//       if (
//         !Object.keys(answersWithQuestion[question.publish_date]).includes(
//           question.qid
//         )
//       ) {
//         answersWithQuestion[question.publish_date][question.qid] = {
//           ...question,
//           answers: {
//             [aid]: {
//               ...answer,
//             },
//           },
//         };
//       } else {
//         answersWithQuestion[question.publish_date][question.qid].answers[aid] =
//           {
//             ...answer,
//           };
//       }
//     });

//   return answersWithQuestion;
// };

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

export async function getUserAnswers(uid: string) {
  const answers = (
    await get(query(ref(fireDB, "answers"), orderByChild("uid"), equalTo(uid)))
  ).val();

  return answers as FetchedAnswers;
}

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
