import { child, push, ref, update } from "firebase/database";
import { QuestionsDataModel } from "../models/QuestionModels";
import { calcWeek } from "./DateManager";
import { fireDB } from "./firebase";
import { fetchFireDBData } from "./fireDB";

export interface QuestionInputsForm {
  qid?: string;
  keyword: string;
  question: string;
  publish_date: string;
}

const updateQuestion = async (qid: string, questionUpdateForm: {}) => {
  let updates = {};

  updates = Object.keys(questionUpdateForm).reduce(
    (res, field) => ({
      ...res,
      ["questions/" + qid + "/" + field]: questionUpdateForm[field],
    }),
    updates
  );

  await update(ref(fireDB), updates);
};

const deleteQuestion = async (qid: string) => {
  const updates = {};
  updates["questions/" + qid] = null;

  await update(ref(fireDB), updates);
};

const enrollQuestion = async (questionUpdateForm: QuestionInputsForm) => {
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
    ...questionUpdateForm,
  };

  newQid && (await updateQuestion(newQid, questionData));
};

const getfilteredByDate = async (date: string) => {
  const questions: QuestionsDataModel = await fetchFireDBData("questions", {
    by: "publish_date",
    value: date,
  });

  return questions || {};
};

const AdminApi = {
  question: {
    enroll: enrollQuestion,
    update: updateQuestion,
    delete: deleteQuestion,
    getfilteredByDate,
  },
};

export default AdminApi;
