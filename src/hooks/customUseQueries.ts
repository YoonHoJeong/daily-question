import { useQuery } from "react-query";
import {
  DateQidAnswersDataModel,
  AnswersDataModel,
} from "../model/AnswerModels";
import { QuestionsDataModel } from "../model/QuestionModels";

import {
  DateQidAnswers,
  getBoardAnswers,
  getUserAnswers,
} from "../services/AnswerApi";
import { getTodayQuestions } from "../services/QuestionApi";

const config = { initialData: {} };

export const useFetchQuestions = () =>
  useQuery<QuestionsDataModel>("questions", getTodayQuestions, config);

export const useFetchBoardAnswers = () =>
  useQuery<DateQidAnswersDataModel>("board-answers", getBoardAnswers, config);

export const useFetchUserAnswers = (uid: string) =>
  useQuery<AnswersDataModel>("user-answers", () => getUserAnswers(uid), config);
