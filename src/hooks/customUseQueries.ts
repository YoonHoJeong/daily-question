import { AnswersWrapper } from "./../services/AnswerApi";
import { useQuery } from "react-query";
import {
  DateQidAnswersDataModel,
  AnswersDataModel,
} from "../model/AnswerModels";
import { QuestionsDataModel } from "../model/QuestionModels";

import { getBoardAnswers, getUserAnswers } from "../services/AnswerApi";
import { getTodayQuestions } from "../services/QuestionApi";

const MIN_IN_MS = 60000;
const HOUR_IN_MS = MIN_IN_MS * 60;

// default stale time : 5min
const defaultConfig = { staleTime: 5 * MIN_IN_MS };
const questionConfig = {
  ...defaultConfig,
  staleTime: 3 * HOUR_IN_MS,
  cacheTime: 3 * HOUR_IN_MS,
};

export const useFetchQuestions = () => {
  return useQuery<QuestionsDataModel>(
    "questions",
    getTodayQuestions,
    questionConfig
  );
};

export const useFetchBoardAnswers = () =>
  useQuery<DateQidAnswersDataModel>(
    "board-answers",
    getBoardAnswers,
    defaultConfig
  );

export const useFetchUserAnswers = (uid: string) => {
  const queryResult = useQuery<AnswersDataModel>(
    "user-answers",
    () => getUserAnswers(uid),
    defaultConfig
  );
  const modelledQueryResult = {
    ...queryResult,
    data: new AnswersWrapper(queryResult.data),
  };

  return modelledQueryResult;
};
