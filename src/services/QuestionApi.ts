import { FetchedQuestions } from "../model/interfaces";
import { getToday } from "./DateManager";
import { getData } from "./DBInterface";

export const getTodayQuestions = async () => {
  const questions = await getData<FetchedQuestions>("questions", {
    key: "publish_date",
    value: getToday(),
  });
  return questions;
};
