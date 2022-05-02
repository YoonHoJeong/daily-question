import { useAuth } from './useAuth';
// import { AnswersWrapper } from './../services/AnswerApi';
import { useQueries, useQuery } from 'react-query';
import { DateQidAnswersData, AnswersData } from '../models/AnswerModels';
import { QuestionsDataModel, QuestionsWrapper } from '../models/QuestionModels';

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

// TODO : custom useQueries 만들기
// - input : queryKeys
// - queryKey로 fetchFunction 가져와서 넣어주면 됨. 근데, my-answers같은 경우 어떻게 할지 고민.

// const fetchFunctions: {
//   [queryKey:QueryKey]: Function
// } = {
//   'board-answers': getBoardAnswers,
//   'questions': getTodayQuestions,
//   'my-answers': getUserAnswers,
//   'user-answers': getUserAnswers,
// }

// const getFetchFunction = (queryKey: QueryKey) => {
//   if (queryKey === 'questions') {
//     return getTodayQuestions;
//   }
//   if (queryKey === 'my-answers') {
//     return (myUid:string) => getUserAnswers(myUid);
//   }
//   if (queryKey === 'board-answers') {
//     return getBoardAnswers;
//   }
//   if (Array.isArray(queryKey) && queryKey[0] === 'user-answers') {
//       return getUserAnswers(queryKey[1].uid);
//   }
// }

export const useFetchUserAnswers = (uid: string, options?: object) =>
  useQuery<AnswersData, unknown, AnswersWrapper>(['user-answers', { uid }], () => getUserAnswers(uid), {
    ...defaultConfig,
    select: (data) => new AnswersWrapper(data),
    ...options,
  });

export const useFetchMyAnswers = () => {
  const { user } = useAuth();

  if (!user?.uid) {
    throw new Error('fetch user answers, but no uid');
  }

  return useFetchUserAnswers(user.uid, { suspense: true });
};

export const useFetchQuestions = () => {
  return useQuery<QuestionsDataModel, unknown, QuestionsWrapper>('questions', getTodayQuestions, {
    ...questionConfig,
    suspense: true,
    select: (data) => new QuestionsWrapper(data),
  });
};

export const useFetchBoardAnswers = () => useQuery<DateQidAnswersData>('board-answers', getBoardAnswers, defaultConfig);

export type QueryKey = 'questions' | ['user-answers', { uid: string }] | 'board-answers' | 'my-answers';
