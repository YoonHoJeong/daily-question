import { FetchedQuestions } from "./../model/interfaces";
import {
  child,
  equalTo,
  orderByChild,
  push,
  query,
  ref,
  update,
} from "firebase/database";
import { calcWeek } from "./DateManager";
import { fireDB } from "./firebase";
import { fetchFireDBData } from "./fireDB";

export interface QuestionUpdateForm {
  keyword: string;
  question: string;
  publish_date: string;
}

const enrollQuestion = async (questionUpdateForm: QuestionUpdateForm) => {
  const isValid = () => {
    Object.keys(questionUpdateForm).forEach((field) => {
      if (!questionUpdateForm[field]) {
        throw new Error(`Empty Field: ${field}`);
      }
    });
  };

  // check form validation
  isValid();

  const newQid = push(child(ref(fireDB), "questions")).key;
  const week = calcWeek(new Date(questionUpdateForm.publish_date));

  let questionData = {
    qid: newQid,
    week,
  };

  questionData = Object.keys(questionUpdateForm).reduce(
    (res, field) => ({ ...res, [field]: questionUpdateForm[field] }),
    questionData
  );

  const updates = { ["/questions/" + newQid]: questionData };

  await update(ref(fireDB), updates);
};

const getfilteredByDate = async (date: string) => {
  const questions: FetchedQuestions = await fetchFireDBData("questions", {
    by: "publish_date",
    value: date,
  });
  console.log(questions || {});

  return questions || {};
};

const AdminApi = {
  question: {
    enroll: enrollQuestion,
    getfilteredByDate,
  },
};

export default AdminApi;
