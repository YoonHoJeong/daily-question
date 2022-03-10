import { useQuery } from "react-query";
import { DateQidAnswers, AnswersDataModel } from "../model/AnswerModels";
import { QuestionsDataModel } from "../model/QuestionModels";

import { getBoardAnswers, getUserAnswers } from "../services/AnswerApi";
import { getTodayQuestions } from "../services/QuestionApi";

const config = { initialData: {} };

export const useFetchQuestions = () => {
  return useQuery<QuestionsDataModel>("questions", getTodayQuestions, config);
};

export const useFetchBoardAnswers = () =>
  useQuery<DateQidAnswers>("board-answers", getBoardAnswers, config);

export const useFetchUserAnswers = (uid: string) =>
  useQuery<AnswersDataModel>("user-answers", () => getUserAnswers(uid), config);
