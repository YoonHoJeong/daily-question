import { QuestionsDataModel } from "../model/QuestionModels";
import { getToday } from "./DateManager";
import { getData } from "./DBInterface";

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
