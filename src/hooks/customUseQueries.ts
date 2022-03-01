import { useQuery } from "react-query";
import {
  FetchedQuestions,
  FetchedAnswers,
  DateQuestionsAndAnswers,
  WeekDateAnswers,
} from "../model/interfaces";
import {
  getBoardAnswers,
  getMonthlyUserAnswers,
  getTodayQuestions,
  getUserAnswers,
  getUserKeptAnswers,
} from "../services/fireDB";

const config = { initialData: {} };

export const useFetchQuestions = () => {
  return useQuery<FetchedQuestions>("questions", getTodayQuestions, config);
};

export const useFetchUserAnswers = (uid: string) =>
  useQuery<FetchedAnswers>("my-answers", () => getUserAnswers(uid), config);

export const useFetchUserWeekDateAnswers = (uid: string) =>
  useQuery<WeekDateAnswers>(
    "my-week-date-answers",
    () => getMonthlyUserAnswers(uid),
    config
  );

export const useFetchRecentAnswers = () =>
  useQuery<DateQuestionsAndAnswers>("recent-answers", getBoardAnswers, config);

export const useFetchUserKeptAnswers = (uid: string) =>
  useQuery<DateQuestionsAndAnswers>(
    "my-kept-answers",
    () => getUserKeptAnswers(uid),
    config
  );
