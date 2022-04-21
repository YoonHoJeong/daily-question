import { useAuth } from './useAuth';
// import { AnswersWrapper } from './../services/AnswerApi';
import { useQuery, UseQueryResult } from 'react-query';
import { DateQidAnswersData, AnswersData } from '../models/AnswerModels';
import { QuestionsDataModel } from '../models/QuestionModels';

import { getBoardAnswers, getUserAnswers } from '../services/AnswerApi';
import { getTodayQuestions } from '../services/QuestionApi';
import { AnswersWrapper } from '../models/AnswersWrapper';

const MIN_IN_MS = 60000;
const HOUR_IN_MS = MIN_IN_MS * 60;

// default stale time : 5min
const defaultConfig = { staleTime: 5 * MIN_IN_MS };
const questionConfig = {
  ...defaultConfig,
  staleTime: 3 * HOUR_IN_MS,
  cacheTime: 3 * HOUR_IN_MS,
};

export const useFetchUserAnswers = (uid: string, options?: object) =>
  useQuery<AnswersData, unknown, AnswersWrapper>('user-answers', () => getUserAnswers(uid), {
    ...defaultConfig,
    select: (data) => new AnswersWrapper(data),
    ...options,
  });

export const useMyAnswers = () => {
  const { user } = useAuth();

  if (!user?.uid) {
    throw new Error('fetch user answers, but no uid');
  }

  return useFetchUserAnswers(user.uid, { suspense: true });
};

export const useFetchQuestions = () => {
  return useQuery<QuestionsDataModel>('questions', getTodayQuestions, questionConfig);
};

export const useFetchBoardAnswers = () => useQuery<DateQidAnswersData>('board-answers', getBoardAnswers, defaultConfig);
