import { QuestionDataModel, QuestionsDataModel } from "../model/QuestionModels";
import { getToday } from "./DateManager";
import { getData, updateData } from "./DBInterface";

class Question {
  question;
  constructor(question: QuestionDataModel) {
    this.question = question;
  }

  async totalDelete() {
    const response = window.confirm("질문과 관련 답변을 삭제하시겠습니까?");
  }

  async delete() {
    const response = window.confirm("질문을 삭제하시겠습니까?");

    // await updateData(`questions/${this.question.qid}`, null);
  }
  async update() {
    // await updateData(`questions/${this.question.qid}`, {})
  }
}

export const getTodayQuestions = async () => {
  if (process.env.NODE_ENV === "development") {
    const questions = await getData<QuestionsDataModel>("questions");

    return questions;
  }

  const questions = await getData<QuestionsDataModel>("questions", {
    key: "publish_date",
    value: getToday(),
  });
  return questions;
};

export const getAllQuestions = async () => {
  const questions = await getData<QuestionsDataModel>("questions");
  return questions;
};
