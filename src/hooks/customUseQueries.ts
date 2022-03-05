import { useQuery } from "react-query";
import {
  FetchedQuestions,
  FetchedAnswers,
  DateQidAnswers,
} from "../model/interfaces";
import {
  getBoardAnswers,
  getTodayQuestions,
  getUserAnswers,
} from "../services/fireDB";

const config = { initialData: {} };

export const useFetchQuestions = () => {
  return useQuery<FetchedQuestions>("questions", getTodayQuestions, config);
};

export const useFetchBoardAnswers = () =>
  useQuery<DateQidAnswers>("board-answers", getBoardAnswers, config);

export const useFetchUserAnswers = (uid: string) =>
  useQuery<FetchedAnswers>("user-answers", () => getUserAnswers(uid), config);
