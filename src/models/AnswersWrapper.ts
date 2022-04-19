import moment from 'moment';
import { UseMomentValue } from '../hooks/useMoment';
import { AnswersData } from './AnswerModels';
import { DateQidAnswersValue, DateQidAnswersWrapper } from './DateQidAnswersWrapper';

export interface AnswersWrapperValue {
  getWeeklyAnswers: (moment: UseMomentValue) => DateQidAnswersValue;
  getMonthlyAnswers: (moment: UseMomentValue) => DateQidAnswersValue;
}

export const AnswersWrapper = (data: AnswersData) => {
  const value: AnswersWrapperValue = {
    getWeeklyAnswers(momentVal) {
      const filter = getFilter(data, momentVal);
      return DateQidAnswersWrapper(filter('year', 'week'));
    },
    getMonthlyAnswers: (momentVal) => {
      const filter = getFilter(data, momentVal);
      return DateQidAnswersWrapper(filter('year', 'month'));
    },
  };

  return value;
};

type MomentFilterKeys = 'year' | 'month' | 'week';
const getFilter =
  (answers: AnswersData, toFilterDate: UseMomentValue) =>
  (...filterKeys: MomentFilterKeys[]) => {
    const filtered: AnswersData = Object.keys(answers)
      .filter((aid) => {
        const {
          question: { publish_date },
        } = answers[aid];
        const answerMoment = moment(publish_date);
        return filterKeys.every((key) => toFilterDate[key] === answerMoment[key]());
      })
      .reduce((obj, aid) => {
        return { ...obj, [aid]: answers[aid] };
      }, {});
    return filtered;
  };
